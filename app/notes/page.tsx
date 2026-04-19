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
import { mockNotes } from "@/lib/mocks/notes";

const dateTimeFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

export default function Notes() {
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
              borderRadius: 4,
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
                  モックデータを表示する一覧ページです。次のステップで作成・編集・削除を足していきます。
                </Typography>
              </Box>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ flexWrap: "wrap" }}
              >
                <Chip
                  label={`${mockNotes.length} notes`}
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
              borderRadius: 4,
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
                placeholder="検索UIは次のステップで実装"
                size="small"
                fullWidth
                disabled
              />
              <Button variant="contained" disabled sx={{ minWidth: 140 }}>
                New Note
              </Button>
            </Stack>

            <TableContainer>
              <Table sx={{ minWidth: 760 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "34%" }}>Title</TableCell>
                    <TableCell>Preview</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Created</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockNotes.map((note) => (
                    <TableRow key={note.id} hover>
                      <TableCell>
                        <Stack spacing={0.75}>
                          <Typography variant="subtitle2">
                            {note.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {note.id}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {note.content}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {formatDateTime(note.createdAt)}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {formatDateTime(note.updatedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
