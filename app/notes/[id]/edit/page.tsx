import { Box } from "@mui/material";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { updateNote } from "@/app/notes/actions";
import { NoteForm } from "@/app/notes/components/note-form";
import { NotesShell } from "@/app/notes/components/notes-shell";
import { NotesSurface } from "@/app/notes/components/notes-surface";
import { createInitialNoteFormState } from "@/app/notes/form-state";
import { getNoteById } from "@/lib/notes";

type EditNotePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNotePage({ params }: EditNotePageProps) {
  await connection();
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <NotesShell
      title="Edit Note"
      maxWidth="md"
    >
      <NotesSurface>
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <NoteForm
            mode="edit"
            action={updateNote}
            initialState={createInitialNoteFormState({
              title: note.title,
              content: note.content,
            })}
            noteId={note.id}
          />
        </Box>
      </NotesSurface>
    </NotesShell>
  );
}
