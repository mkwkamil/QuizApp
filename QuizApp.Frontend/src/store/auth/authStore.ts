import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, AuthCredentials } from "./authTypes";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            login: ({ token, user }: AuthCredentials) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
            updateUser: (partial) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...partial } : null,
                })),
        }),
        {
            name: "auth-storage",
        }
    )
);