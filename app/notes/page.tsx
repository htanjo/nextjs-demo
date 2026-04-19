import {
  Box,
  Button,
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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { connection } from "next/server";
import { NoteTableRow } from "@/app/notes/components/note-table-row";
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
            <TextField
              label="Search notes"
              placeholder="Search UI can be added in a later step"
              size="small"
              fullWidth
              disabled
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              href="/notes/new"
              startIcon={<AddRoundedIcon />}
              sx={{ minWidth: 160, alignSelf: { xs: "stretch", sm: "center" } }}
            >
              New Note
            </Button>
          </Stack>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 760, tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 240 }}>Title</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell sx={{ width: 160, whiteSpace: "nowrap" }}>
                  Created
                </TableCell>
                <TableCell sx={{ width: 160, whiteSpace: "nowrap" }}>
                  Updated
                </TableCell>
                <TableCell sx={{ width: 88, whiteSpace: "nowrap" }}>
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
                  <NoteTableRow
                    key={note.id}
                    note={note}
                    createdLabel={formatDateTime(note.createdAt)}
                    updatedLabel={formatDateTime(note.updatedAt)}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </NotesSurface>
    </NotesShell>
  );
}
