import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export const fetchNotes = async (search?: string, page?: number, tag?: string) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const { data } = await api.get("/notes", {
    params: { search, page, tag, perPage: 12 },
    headers: { Cookie: allCookies },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: allCookies },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const { data } = await api.get("/users/me", {
    headers: { Cookie: allCookies },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const response = await api.get<User>("/auth/session", {
    headers: { Cookie: allCookies },
  });
  return response;
};