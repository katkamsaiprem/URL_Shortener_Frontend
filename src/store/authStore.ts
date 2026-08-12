import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ApiResponse, AuthStore, User } from "../types/auth";
import api from "../services/api";

export const useAuthStore = create<AuthStore>()(
    devtools(
        (set) => ({
            user: null,
            isLoading: true,


            restoreSession: async () => {
                try {
                    const res = await api.get<ApiResponse<{ user: User }>>("/api/v1/auth/me");
                    set({ user: res.data.data?.user ?? null }, false, "restoreSession/success");
                } catch {
                    set({ user: null }, false, "restoreSession/fail");
                } finally {
                    set({ isLoading: false }, false, "restoreSession/done");
                }
            },


            login: async (email, password) => {
                const res = await api.post<ApiResponse<{ user: User }>>("/api/v1/auth/login", {
                    email,
                    password,
                });
                set({ user: res.data.data?.user ?? null }, false, "login");
            },


            register: async (username, email, password) => {
                const res = await api.post<ApiResponse<{ user: User }>>("/api/v1/auth/register", {
                    username,
                    email,
                    password,
                });
                set({ user: res.data.data?.user ?? null }, false, "register");
            },


            logout: async () => {
                await api.post("/api/v1/auth/logout");
                set({ user: null }, false, "logout");
            },
        }),
        { name: "AuthStore" }
    )
);
