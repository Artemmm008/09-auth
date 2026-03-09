import { api } from "./api";
import type { Note, NewNoteData } from "@/types/note";
import type { User } from "@/types/user";

export const fetchNotes = async (search?: string, page?: number, tag?: string) => {
  const { data } = await api.get("/notes", {
    params: { search, page, tag, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (credentials: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", credentials);
  return data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (credentials: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get("/auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};

export interface UpdateUserRequest {
  username: string;
}

export const updateMe = async (userData: UpdateUserRequest): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", userData);
  return data;
};