export type UserRole = "admin" | "engineer" | "operator" | "chemist";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  nationalID?: number;
  role: UserRole;
}

export interface SessionState {
  token: string;
  isAuthenticated: boolean;
  user: AuthUser;
}
