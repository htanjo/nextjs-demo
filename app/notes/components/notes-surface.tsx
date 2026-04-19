import type { ReactNode } from "react";
import { Paper } from "@mui/material";

type NotesSurfaceProps = {
  children: ReactNode;
};

export function NotesSurface({ children }: NotesSurfaceProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "rgba(15, 23, 42, 0.08)",
        borderRadius: 3,
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {children}
    </Paper>
  );
}
