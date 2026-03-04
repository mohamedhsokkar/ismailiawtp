import type { AuthUser, SessionState, UserRole } from "../types/auth";

const SESSION_KEY = "session";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

const parseSession = (raw: string | null): SessionState | null => {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return null;
  }
};

export const getSession = (): SessionState | null => parseSession(localStorage.getItem(SESSION_KEY));

export const clearSession = () => localStorage.removeItem(SESSION_KEY);

export const setSession = (session: SessionState) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const login = async (email: string, password: string): Promise<SessionState> => {
  const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const loginData = await loginResponse.json();
  if (!loginResponse.ok) {
    throw new Error(loginData?.error?.[0]?.msg ?? "Login failed");
  }

  const token = loginData.token as string;
  const profileResponse = await fetch(`${API_BASE_URL}/api/users/me`, {
    headers: authHeaders(token),
  });
  const profileData = await profileResponse.json();

  if (!profileResponse.ok) {
    throw new Error(profileData?.msg ?? "Unable to load user profile");
  }

  const session: SessionState = {
    token,
    isAuthenticated: true,
    user: profileData as AuthUser,
  };

  setSession(session);
  return session;
};

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  nationalID: string;
  role: UserRole;
}

export const register = async (payload: RegisterPayload) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.[0]?.msg ?? data?.errors?.[0]?.msg ?? "Registration failed");
  }
  return data;
};
