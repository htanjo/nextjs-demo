"use client";

import { useActionState } from "react";
import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { NoteFormState } from "@/app/notes/form-state";

type NoteFormAction = (
  state: NoteFormState,
  formData: FormData,
) => Promise<NoteFormState>;

type NoteFormMode = "create" | "edit";

type NoteFormProps = {
  mode: NoteFormMode;
  action: NoteFormAction;
  initialState: NoteFormState;
  noteId?: string;
};

export function NoteForm({
  mode,
  action,
  initialState,
  noteId,
}: NoteFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const { values, errors, message } = state;
  const submitLabel = mode === "create" ? "Create Note" : "Update Note";
  const pendingLabel = mode === "create" ? "Creating..." : "Updating...";

  return (
    <Stack
      component="form"
      action={formAction}
      spacing={3}
      noValidate
      autoComplete="off"
    >
      {noteId ? (
        <Typography variant="caption" color="text.secondary">
          Note ID: {noteId}
        </Typography>
      ) : null}

      {message ? (
        <Alert severity={errors ? "error" : "success"}>{message}</Alert>
      ) : null}

      {noteId ? <input type="hidden" name="id" value={noteId} /> : null}

      <TextField
        label="Title"
        name="title"
        placeholder="e.g. Notes app architecture memo"
        defaultValue={values.title}
        error={Boolean(errors?.title)}
        helperText={errors?.title?.[0] ?? "Up to 30 characters"}
        required
        fullWidth
      />
      <TextField
        label="Content"
        name="content"
        placeholder="Write your note here..."
        defaultValue={values.content}
        error={Boolean(errors?.content)}
        helperText={errors?.content?.[0] ?? "Required. Up to 5000 characters"}
        required
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
          <Button variant="contained" type="submit" disabled={pending}>
            {pending ? pendingLabel : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
