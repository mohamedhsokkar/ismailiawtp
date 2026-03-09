const SESSION_KEY = "session";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
const parseSession = (raw) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
const getSession = () => parseSession(localStorage.getItem(SESSION_KEY));
const clearSession = () => localStorage.removeItem(SESSION_KEY);
const setSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};
const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});
const login = async (email, password) => {
  const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const loginData = await loginResponse.json();
  if (!loginResponse.ok) {
    throw new Error(loginData?.error?.[0]?.msg ?? "Login failed");
  }
  const token = loginData.token;
  const profileResponse = await fetch(`${API_BASE_URL}/api/users/me`, {
    headers: authHeaders(token)
  });
  const profileData = await profileResponse.json();
  if (!profileResponse.ok) {
    throw new Error(profileData?.msg ?? "Unable to load user profile");
  }
  const session = {
    token,
    isAuthenticated: true,
    user: profileData
  };
  setSession(session);
  return session;
};
const register = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.[0]?.msg ?? data?.errors?.[0]?.msg ?? "Registration failed");
  }
  return data;
};
const getAuthHeaders = () => {
  const session = getSession();
  if (!session?.token) {
    throw new Error("You are not authenticated");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`
  };
};
const parseApiResponse = async (response) => {
  const raw = await response.text();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return { msg: raw };
  }
};
const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/all`, {
    headers: getAuthHeaders()
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.msg ?? "Failed to load users");
  }
  return data;
};
const adminCreateUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/users/admin-create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.[0]?.msg ?? data?.errors?.[0]?.msg ?? data?.msg ?? "Failed to create user");
  }
  return data;
};
const changePassword = async (currentPassword, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/api/users/change-password`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentPassword, newPassword })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.[0]?.msg ?? data?.errors?.[0]?.msg ?? data?.msg ?? "Failed to change password");
  }
  return data;
};
const getIssues = async () => {
  const response = await fetch(`${API_BASE_URL}/api/issues`, {
    headers: getAuthHeaders()
  });
  const data = await parseApiResponse(response);
  if (!response.ok) {
    throw new Error(data?.msg ?? "Failed to load issues");
  }
  return data;
};
const createIssue = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/issues`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await parseApiResponse(response);
  if (!response.ok) {
    throw new Error(data?.error?.[0]?.msg ?? data?.errors?.[0]?.msg ?? data?.msg ?? "Failed to create issue");
  }
  return data;
};
const updateIssue = async (id, payload) => {
  const response = await fetch(`${API_BASE_URL}/api/issues/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await parseApiResponse(response);
  if (!response.ok) {
    throw new Error(data?.error?.[0]?.msg ?? data?.errors?.[0]?.msg ?? data?.msg ?? "Failed to update issue");
  }
  return data;
};
export {
  adminCreateUser,
  changePassword,
  clearSession,
  createIssue,
  getAllUsers,
  getIssues,
  getSession,
  login,
  register,
  setSession,
  updateIssue
};
