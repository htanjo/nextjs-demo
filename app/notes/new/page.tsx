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
              まずは作成ページのUIだけを用意しています。次のステップで入力値の管理と保存処理を追加します。
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
            <Stack
              component="form"
              spacing={3}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Title"
                name="title"
                placeholder="e.g. Notes app architecture memo"
                fullWidth
              />
              <TextField
                label="Content"
                name="content"
                placeholder="Write your note here..."
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
                  Cancel
                </Button>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{ alignItems: { xs: "stretch", sm: "center" } }}
                >
                  <Button variant="outlined" disabled>
                    Save Draft
                  </Button>
                  <Button variant="contained" disabled>
                    Create Note
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
