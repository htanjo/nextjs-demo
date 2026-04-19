"use server";

import { z } from "zod";
import { type CreateNoteFormState } from "@/app/notes/form-state";
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

  console.log("Validated note payload:", validatedFields.data);

  return {
    message: "Validation passed. Persistence will be added in the next step.",
    values: validatedFields.data,
  };
}
