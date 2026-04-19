"use client";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { deleteNote } from "@/app/notes/actions";
import type { Note } from "@/lib/types/note";

type NoteTableRowProps = {
  note: Note;
  createdLabel: string;
  updatedLabel: string;
};

export function NoteTableRow({
  note,
  createdLabel,
  updatedLabel,
}: NoteTableRowProps) {
  const router = useRouter();

  return (
    <TableRow
      hover
      onClick={() => router.push(`/notes/${note.id}/edit`)}
      sx={{
        cursor: "pointer",
        "& > *": {
          borderColor: "rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <TableCell>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
          <DescriptionOutlinedIcon
            sx={{ fontSize: 19, color: "text.secondary", flexShrink: 0 }}
          />
          <Typography variant="subtitle2" noWrap title={note.title}>
            {note.title}
          </Typography>
        </Stack>
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
      <TableCell sx={{ whiteSpace: "nowrap" }}>{createdLabel}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{updatedLabel}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        <form
          action={deleteNote}
          onClick={(event) => event.stopPropagation()}
          style={{ display: "inline-flex" }}
        >
          <input type="hidden" name="id" value={note.id} />
          <Tooltip title="Delete">
            <IconButton
              type="submit"
              aria-label={`Delete ${note.title}`}
              color="default"
              size="small"
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        </form>
      </TableCell>
    </TableRow>
  );
}
