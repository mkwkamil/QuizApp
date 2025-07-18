export interface LoginRequestDto {
    username: string;
    password: string;
}

export interface RegisterRequestDto {
    username: string;
    email: string;
    password: string;
}

export interface AuthCredentials {
    token: string;
    user: AuthUser;
}

export interface AuthUser {
    id: number;
    username: string;
    publicname: string;
    email: string;
    role: string;
}

export interface AuthState {
    token: string | null;
    user: AuthUser | null;
    login: (data: { token: string, user: AuthUser }) => void;
    logout: () => void;
    updateUser: (partial: Partial<AuthUser>) => void;
}
