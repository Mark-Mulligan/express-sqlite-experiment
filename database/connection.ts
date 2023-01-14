// path
import path from 'path';

// SQlite3
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const db_name = path.join(__dirname, '../test.db');

export const connectDB = async () => {
  const db = await open({ filename: db_name, driver: sqlite3.Database });

  const sql = `CREATE TABLE IF NOT EXISTS parks (
            id INTEGER PRIMARY KEY,
            fullName varchar(255),
            parkCode varchar(255),
            states varchar(255),
            designation varchar(255)
        );`;

  console.log('created table');
  await db.exec(sql);
  await db.close();
  console.log('connection closed');
};
