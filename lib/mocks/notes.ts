import type { Note } from "@/lib/types/note";

export const mockNotes: Note[] = [
  {
    id: "note-001",
    title: "Next.js App Router learning memo",
    content:
      "Reviewed the relationship between Server Components and Client Components. Material UI components can be rendered from a Server Component as long as the library exports a client boundary.",
    createdAt: "2026-04-17T09:00:00.000Z",
    updatedAt: "2026-04-19T01:30:00.000Z",
  },
  {
    id: "note-002",
    title: "Ideas for the notes app",
    content:
      "Start from the list page with mock data, then add create, edit, and delete. Keep server-side persistence in mind so the later transition to Server Actions feels natural.",
    createdAt: "2026-04-16T03:45:00.000Z",
    updatedAt: "2026-04-18T12:10:00.000Z",
  },
  {
    id: "note-003",
    title: "UI inspiration",
    content:
      "Aim for a calm file-list experience similar to Google Drive. Prioritize readability, spacing, and a clear hierarchy over flashy decoration.",
    createdAt: "2026-04-15T14:20:00.000Z",
    updatedAt: "2026-04-18T23:05:00.000Z",
  },
];
