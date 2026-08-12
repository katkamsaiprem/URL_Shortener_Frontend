import api from "./api";
import type { ApiResponse } from "../types/api";
import type { CreateUrlInput, ShortUrl, UpdateUrlInput, UrlFilterParams } from "../types/url";

export const fetchUrls = async (params?: UrlFilterParams): Promise<ShortUrl[]> => {
    const res = await api.get<ApiResponse<{ urls: ShortUrl[] }>>("/api/v1/urls", { params });
    return res.data.data?.urls ?? [];
};

export const createUrl = async (payload: CreateUrlInput): Promise<ShortUrl> => {
    const res = await api.post<ApiResponse<{ url: ShortUrl }>>("/api/v1/urls", payload);
    return res.data.data!.url;
};

export const updateUrl = async (id: string, payload: UpdateUrlInput): Promise<ShortUrl> => {
    const res = await api.put<ApiResponse<{ url: ShortUrl }>>(`/api/v1/urls/${id}`, payload);
    return res.data.data!.url;
};

export const deleteUrl = async (id: string): Promise<void> => {
    await api.delete(`/api/v1/urls/${id}`);
};
