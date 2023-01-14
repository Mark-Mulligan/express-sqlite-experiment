// path
import path from 'path';

// SQlite3
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// const db_name = 'edgeAudit.db';
const db_name = path.join(__dirname, '../test.db');

export default async () => {
  const db = await open({ filename: db_name, driver: sqlite3.Database });
  const result = await db.all(`SELECT * FROM parks;`);
  await db.close();
  return result;
};
