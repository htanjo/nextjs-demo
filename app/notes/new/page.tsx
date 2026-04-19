import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { NoteForm } from "./note-form";

export default function NewNotePage() {
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
              <Typography color="text.primary">New</Typography>
            </Breadcrumbs>
            <Typography variant="h4" component="h1">
              Create Note
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              First we are wiring validation into the form. Persistence and
              redirects will be added in the next step.
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
            <NoteForm />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
