import sqlite3 from 'sqlite3';
import fs from 'fs/promises'; 
import { open } from 'sqlite';
import { config } from '../../config/env.js';

const DATA_DIR = config.dbDir;
const DB_FILE  = config.dbPath;

export async function setupDatabase() {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // RQ01
    const db = await open({
        filename: DB_FILE,
        driver: sqlite3.Database
    });

    // RQ02 e RQ03
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            age INTEGER,
            dob TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}