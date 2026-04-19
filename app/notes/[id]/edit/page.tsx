import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";
import { connection } from "next/server";
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
              This step only loads the existing note into the edit screen. The
              actual update action will be added next.
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
            <Stack spacing={3}>
              <TextField
                label="Title"
                defaultValue={note.title}
                helperText={`Note ID: ${note.id}`}
                fullWidth
              />
              <TextField
                label="Content"
                defaultValue={note.content}
                fullWidth
                multiline
                minRows={10}
              />

              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                }}
              >
                <Button variant="text" component={Link} href="/notes">
                  Back to Notes
                </Button>
                <Button variant="contained" disabled>
                  Update Note
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
