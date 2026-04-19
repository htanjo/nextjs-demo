"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { type CreateNoteFormState } from "@/app/notes/form-state";
import {
  createNote as createNoteRecord,
  deleteNote as deleteNoteRecord,
} from "@/lib/notes";
import { createNoteSchema } from "@/lib/validations/note";

export async function createNote(
  _prevState: CreateNoteFormState,
  formData: FormData,
): Promise<CreateNoteFormState> {
  const values = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
  };

  const validatedFields = createNoteSchema.safeParse(values);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      message: "Please fix the errors below.",
      errors: flattenedErrors.fieldErrors,
      values,
    };
  }

  await createNoteRecord(validatedFields.data);
  redirect("/notes");
}

export async function deleteNote(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  await deleteNoteRecord(id);
  redirect("/notes");
}
