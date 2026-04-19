"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { type NoteFormState } from "@/app/notes/form-state";
import {
  createNote as createNoteRecord,
  deleteNote as deleteNoteRecord,
  updateNote as updateNoteRecord,
} from "@/lib/notes";
import { createNoteSchema } from "@/lib/validations/note";

function getValidatedNoteInput(formData: FormData) {
  const values = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
  };

  const validatedFields = createNoteSchema.safeParse(values);

  return { values, validatedFields };
}

export async function createNote(
  _prevState: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  const { values, validatedFields } = getValidatedNoteInput(formData);

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

export async function updateNote(
  _prevState: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  const id = String(formData.get("id") ?? "");
  const { values, validatedFields } = getValidatedNoteInput(formData);

  if (!id) {
    return {
      message: "The note ID is missing.",
      values,
    };
  }

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      message: "Please fix the errors below.",
      errors: flattenedErrors.fieldErrors,
      values,
    };
  }

  await updateNoteRecord(id, validatedFields.data);
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
