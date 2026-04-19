import "server-only";

import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "notes.db");

type DatabaseGlobal = typeof globalThis & {
  __notesDb?: Database.Database;
};

function createDatabase() {
  mkdirSync(dataDirectory, { recursive: true });

  const db = new Database(databasePath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  return db;
}

export function getDb() {
  const globalForDb = globalThis as DatabaseGlobal;

  if (!globalForDb.__notesDb) {
    globalForDb.__notesDb = createDatabase();
  }

  return globalForDb.__notesDb;
}
