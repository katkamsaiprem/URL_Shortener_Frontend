// Shape of a URL as returned from the backend (matches urls.schema.ts)
export interface ShortUrl {
    id: string;
    userId: string;
    originalUrl: string;
    shortCode: string;
    expiresAt: string | null;
    visitCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUrlInput {
    originalUrl: string;
    expiresAt?: string; // ISO date string
}

export interface UpdateUrlInput {
    originalUrl?: string;
    expiresAt?: string | null;
}
