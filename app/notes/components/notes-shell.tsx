import type { ReactNode } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, Link, Stack, Typography } from "@mui/material";

type NotesShellProps = {
  title?: string;
  children: ReactNode;
  maxWidth?: "md" | "lg";
  noteCount?: number;
};

export function NotesShell({
  title,
  children,
  maxWidth = "lg",
  noteCount,
}: NotesShellProps) {
  return (
    <Box sx={{ minHeight: "100dvh", backgroundColor: "#f5f7fb" }}>
      <Box
        component="header"
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid",
          borderColor: "rgba(15, 23, 42, 0.08)",
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
              whiteSpace: "nowrap",
              overflowX: "auto",
            }}
          >
            <Link
              href="/notes"
              underline="none"
              color="text.primary"
              sx={{
                flexShrink: 0,
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              My Notes
            </Link>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {typeof noteCount === "number" ? (
                <Box
                  sx={{
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: "rgba(15, 23, 42, 0.08)",
                    backgroundColor: "#f8fafc",
                    px: 1.5,
                    py: 0.75,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 600 }}
                  >
                    {noteCount} {noteCount === 1 ? "Note" : "Notes"}
                  </Typography>
                </Box>
              ) : null}

              <Link
                href="/"
                underline="none"
                color="text.secondary"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 0.5,
                  py: 0.75,
                  fontWeight: 600,
                }}
              >
                <HomeRoundedIcon sx={{ fontSize: 18 }} />
                Home
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box component="main" sx={{ py: { xs: 3, md: 5 } }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ maxWidth: maxWidth === "md" ? 900 : 1200, mx: "auto" }}>
            <Stack spacing={3}>
              {title ? (
                <Box>
                  <Typography
                    component="h1"
                    align="center"
                    sx={{
                      fontSize: { xs: "1.75rem", md: "2.125rem" },
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      color: "text.primary",
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
              ) : null}
              {children}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
