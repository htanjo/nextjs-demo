import { Button, Container } from "@mui/material";

export default function Notes() {
  return (
    <Container>
      <h1>Notes</h1>
      <p>This is the notes page.</p>
      <Button variant="contained" href="/">
        Back to Home
      </Button>
    </Container>
  );
}
