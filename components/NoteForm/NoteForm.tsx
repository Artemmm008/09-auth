"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createNote } from "@/lib/api/clientApi"
import css from "./NoteForm.module.css";
import { useZustandStore } from '@/lib/store/noteStore';
import type { NewNoteData } from "../../types/note";

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { draft, setDraft, clearDraft } = useZustandStore();

  const handleChange = (
    event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created!");
      clearDraft();
      router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error("Failed to create note.");
    },
  });

   const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;
    mutate(values);
  };

  const handleCancel = () => {
    router.back();
  }

  return (
        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" className={css.input} placeholder="Enter title..."
            defaultValue={draft?.title} onChange={handleChange} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
              defaultValue={draft?.content}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select
              id="tag"
              name="tag"
              className={css.select}
              defaultValue={draft?.tag}
              onChange={handleChange}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
            Create note      
            </button>
          </div>
        </form>
  );
}

export default NoteForm;