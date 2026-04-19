export type NoteFormValues = {
  title: string;
  content: string;
};

export type NoteFormState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message: string;
  values: NoteFormValues;
};

export function createInitialNoteFormState(
  values: Partial<NoteFormValues> = {},
): NoteFormState {
  return {
    message: "",
    values: {
      title: values.title ?? "",
      content: values.content ?? "",
    },
  };
}

export const initialCreateNoteFormState = createInitialNoteFormState();
