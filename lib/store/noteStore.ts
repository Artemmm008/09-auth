import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNoteData } from "../../types/note";

export type ZustandStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useZustandStore = create<ZustandStore>()(persist(
    (set) => ({
        draft: initialDraft,
        setDraft: (note) => set(() => ({ draft: note })),
        clearDraft: () => set(() => ({ draft: initialDraft})),
    }),
    {
        name: "note-draft",
        partialize: (state) => ({ draft: state.draft})
    }
),
)