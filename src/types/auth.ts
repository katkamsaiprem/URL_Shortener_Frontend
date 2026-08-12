export interface User {
    id: string;
    name: string; // stored as 'name' on backend, displayed as username
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

export interface AuthStore {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
}