// lib/session.ts
import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
  cookieName: "todo_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// Typowanie danych w sesji
declare module "iron-session" {
  interface IronSessionData {
    todos?: { id: number, text: string, completed: boolean }[];
  }
}
