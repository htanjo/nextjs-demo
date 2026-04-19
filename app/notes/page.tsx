import {
  Box,
  Button,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { connection } from "next/server";
import { deleteNote } from "@/app/notes/actions";
import { NotesShell } from "@/app/notes/components/notes-shell";
import { NotesSurface } from "@/app/notes/components/notes-surface";
import { listNotes } from "@/lib/notes";

const dateTimeFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

export default async function Notes() {
  await connection();
  const notes = await listNotes();

  return (
    <NotesShell noteCount={notes.length}>
      <NotesSurface>
        <Box sx={{ px: { xs: 2, md: 3 }, py: 2.5 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
              }}
            >
              <TextField
                label="Search notes"
                placeholder="Search UI can be added in a later step"
                size="small"
                fullWidth
                disabled
              />
              <Button
                variant="contained"
                href="/notes/new"
                sx={{ minWidth: 140 }}
              >
                New Note
              </Button>
            </Stack>
          </Stack>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 760, tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 280 }}>Title</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell sx={{ width: 160, whiteSpace: "nowrap" }}>
                  Created
                </TableCell>
                <TableCell sx={{ width: 160, whiteSpace: "nowrap" }}>
                  Updated
                </TableCell>
                <TableCell sx={{ width: 180, whiteSpace: "nowrap" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="text.secondary">
                      No notes yet. Create your first note to populate this
                      list.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                notes.map((note) => (
                  <TableRow key={note.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap title={note.title}>
                        {note.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        title={note.content}
                      >
                        {note.content}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {formatDateTime(note.createdAt)}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {formatDateTime(note.updatedAt)}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <Stack direction="row" spacing={1}>
                        <Button
                          component={Link}
                          href={`/notes/${note.id}/edit`}
                          variant="text"
                        >
                          Edit
                        </Button>
                        <Box
                          component="form"
                          action={deleteNote}
                          sx={{ display: "inline-flex" }}
                        >
                          <input type="hidden" name="id" value={note.id} />
                          <Button color="error" type="submit" variant="text">
                            Delete
                          </Button>
                        </Box>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </NotesSurface>
    </NotesShell>
  );
}
