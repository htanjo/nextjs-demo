export type CreateNoteFormState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message: string;
  values: {
    title: string;
    content: string;
  };
};

export const initialCreateNoteFormState: CreateNoteFormState = {
  message: "",
  values: {
    title: "",
    content: "",
  },
};
