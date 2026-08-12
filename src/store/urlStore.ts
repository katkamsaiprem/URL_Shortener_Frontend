import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CreateUrlInput, ShortUrl, UpdateUrlInput, UrlFilterParams } from "../types/url";
import { createUrl, deleteUrl, fetchUrls, updateUrl } from "../services/urlApi";

interface UrlStore {
    urls: ShortUrl[];       // Filtered URLs for table view
    allUrls: ShortUrl[];    // Unfiltered URLs for StatsOverview
    isLoading: boolean;
    error: string;
    loadUrls: (params?: UrlFilterParams) => Promise<void>;
    addUrl: (payload: CreateUrlInput) => Promise<void>;
    editUrl: (id: string, payload: UpdateUrlInput) => Promise<void>;
    removeUrl: (id: string) => Promise<void>;
}

export const useUrlStore = create<UrlStore>()(
    devtools(
        (set, get) => ({
            urls: [],
            allUrls: [],
            isLoading: false,
            error: "",

            loadUrls: async (params?: UrlFilterParams) => {
                set({ isLoading: true, error: "" });
                try {
                    const hasFilter = Boolean(params?.search || (params?.status && params.status !== "all"));

                    if (!hasFilter) {
                        const fetched = await fetchUrls();
                        set({ allUrls: fetched, urls: fetched });
                    } else {
                        // Ensure allUrls is loaded for StatsOverview if empty
                        if (get().allUrls.length === 0) {
                            const unfiltered = await fetchUrls();
                            set({ allUrls: unfiltered });
                        }
                        const filtered = await fetchUrls(params);
                        set({ urls: filtered });
                    }
                } catch {
                    set({ error: "Failed to load URLs" });
                } finally {
                    set({ isLoading: false });
                }
            },

            addUrl: async (payload) => {
                const newUrl = await createUrl(payload);
                // Prepend so the newest URL appears at the top of both lists
                set((state) => ({
                    allUrls: [newUrl, ...state.allUrls],
                    urls: [newUrl, ...state.urls],
                }));
            },

            editUrl: async (id, payload) => {
                const updated = await updateUrl(id, payload);
                set((state) => ({
                    allUrls: state.allUrls.map((u) => (u.id === id ? updated : u)),
                    urls: state.urls.map((u) => (u.id === id ? updated : u)),
                }));
            },

            removeUrl: async (id) => {
                await deleteUrl(id);
                set((state) => ({
                    allUrls: state.allUrls.filter((u) => u.id !== id),
                    urls: state.urls.filter((u) => u.id !== id),
                }));
            },
        }),
        { name: "UrlStore" }
    )
);
