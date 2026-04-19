import "server-only";

import { createId } from "@paralleldrive/cuid2";
import { getDb } from "@/lib/db";
import type { Note } from "@/lib/types/note";
import type { CreateNoteInput } from "@/lib/validations/note";

type NoteRow = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

function mapRowToNote(row: NoteRow): Note {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listNotes(): Promise<Note[]> {
  const db = getDb();
  const rows = db
    .prepare(
      `
        SELECT id, title, content, created_at, updated_at
        FROM notes
        ORDER BY updated_at DESC
      `,
    )
    .all() as NoteRow[];

  return rows.map(mapRowToNote);
}

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const db = getDb();
  const now = new Date().toISOString();
  const note: Note = {
    id: createId(),
    title: input.title,
    content: input.content,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `
      INSERT INTO notes (id, title, content, created_at, updated_at)
      VALUES (@id, @title, @content, @createdAt, @updatedAt)
    `,
  ).run(note);

  return note;
}
