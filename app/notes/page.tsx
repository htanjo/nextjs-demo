import {
  Box,
  Button,
  Chip,
  Container,
  Link,
  Paper,
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
    <Box
      sx={{
        minHeight: "100%",
        background:
          "linear-gradient(180deg, #f6f8fc 0%, #ffffff 260px, #ffffff 100%)",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
              }}
            >
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Notes Workspace
                </Typography>
                <Typography variant="h4" component="h1" sx={{ mt: 0.5 }}>
                  My Notes
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Notes are now loaded from SQLite. Next we can add editing and
                  deletion on top of the same data flow.
                </Typography>
              </Box>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ flexWrap: "wrap" }}
              >
                <Chip
                  label={`${notes.length} notes`}
                  color="primary"
                  variant="outlined"
                />
                <Button variant="text" component={Link} href="/">
                  Back to Home
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                px: { xs: 2, md: 3 },
                py: 2,
                backgroundColor: "grey.50",
                borderBottom: "1px solid",
                borderColor: "divider",
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
                    <TableCell sx={{ width: 120, whiteSpace: "nowrap" }}>
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
                          <Typography
                            variant="subtitle2"
                            noWrap
                            title={note.title}
                          >
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
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
