import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { updateNote } from "@/app/notes/actions";
import { NoteForm } from "@/app/notes/components/note-form";
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
    <Box
      sx={{
        minHeight: "100%",
        background:
          "linear-gradient(180deg, #f6f8fc 0%, #ffffff 240px, #ffffff 100%)",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/notes">
                Notes
              </Link>
              <Typography color="text.primary">Edit</Typography>
            </Breadcrumbs>
            <Typography variant="h4" component="h1">
              Edit Note
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              The form now reuses the same fields as the create screen and saves
              changes back to SQLite.
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: { xs: 3, md: 4 },
            }}
          >
            <NoteForm
              mode="edit"
              action={updateNote}
              initialState={createInitialNoteFormState({
                title: note.title,
                content: note.content,
              })}
              noteId={note.id}
            />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
