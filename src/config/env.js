import dotenv from 'dotenv';
dotenv.config();

export const config = {
    apiUrl: process.env.API_URL || 'https://randomuser.me/api/?results=150',
    dbPath: process.env.DB_PATH || '../SQLite/database.sqlite',
    dbDir: process.env.DB_PATH || '../SQLite',
    reportsDir: process.env.REPORTS_DIR || '../reports',
    logLevel: process.env.LOG_LEVEL || 'info',
};