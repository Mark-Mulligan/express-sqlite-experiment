// path
import path from 'path';

// SQlite3
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// const db_name = 'test.db';
const db_name = path.join(__dirname, '../test.db');

export default async (fullName: string, parkCode: string, states: string, designation: string) => {
  const db = await open({ filename: db_name, driver: sqlite3.Database });
  const addCameraSQL = `INSERT INTO parks(fullName, parkCode, states, designation) VALUES(?, ?, ?, ?);`;
  const result = await db.run(addCameraSQL, [fullName, parkCode, states, designation]);
  await db.close();
  return { id: result.lastID, fullName, parkCode, states, designation };
};
