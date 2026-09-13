import api from "./api";

export async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function refreshAccessToken(refreshToken) {
  const response = await api.post("/auth/refresh", {
    refresh_token: refreshToken,
  });

  return response.data;
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch {
    // Session is cleared locally even if logout request fails.
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
}