import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CreateUrlInput, ShortUrl, UpdateUrlInput } from "../types/url";
import { createUrl, deleteUrl, fetchUrls, updateUrl } from "../services/urlApi";

interface UrlStore {
    urls: ShortUrl[];
    isLoading: boolean;
    error: string;
    loadUrls: () => Promise<void>;
    addUrl: (payload: CreateUrlInput) => Promise<void>;
    editUrl: (id: string, payload: UpdateUrlInput) => Promise<void>;
    removeUrl: (id: string) => Promise<void>;
}

export const useUrlStore = create<UrlStore>()(
    devtools(
        (set) => ({
            urls: [],
            isLoading: false,
            error: "",

            loadUrls: async () => {
                set({ isLoading: true, error: "" });
                try {
                    const urls = await fetchUrls();
                    set({ urls });
                } catch {
                    set({ error: "Failed to load URLs" });
                } finally {
                    set({ isLoading: false });
                }
            },

            addUrl: async (payload) => {
                const newUrl = await createUrl(payload);
                // Prepend so the newest URL appears at the top
                set((state) => ({ urls: [newUrl, ...state.urls] }));
            },

            editUrl: async (id, payload) => {
                const updated = await updateUrl(id, payload);
                set((state) => ({
                    urls: state.urls.map((u) => (u.id === id ? updated : u)),
                }));
            },

            removeUrl: async (id) => {
                await deleteUrl(id);
                set((state) => ({
                    urls: state.urls.filter((u) => u.id !== id),
                }));
            },
        }),
        { name: "UrlStore" }
    )
);
