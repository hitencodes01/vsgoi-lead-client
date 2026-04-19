import { create } from "zustand";
import { persist } from "zustand/middleware";
import socket from "../socket";

export interface Auth {
  _id: string;
  role: string;
}

export interface AuthStore {
  auth: Auth | null;
  login: (user: Auth) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      auth: null,
      login: (user) => set({ auth: user }),
      logout: () => {
        socket.disconnect();
        set({ auth: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
