import { Box } from "@mui/material";
import { createNote } from "@/app/notes/actions";
import { NoteForm } from "@/app/notes/components/note-form";
import { NotesShell } from "@/app/notes/components/notes-shell";
import { NotesSurface } from "@/app/notes/components/notes-surface";
import { initialCreateNoteFormState } from "@/app/notes/form-state";

export default function NewNotePage() {
  return (
    <NotesShell
      title="Create Note"
      maxWidth="md"
    >
      <NotesSurface>
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <NoteForm
            mode="create"
            action={createNote}
            initialState={initialCreateNoteFormState}
          />
        </Box>
      </NotesSurface>
    </NotesShell>
  );
}
