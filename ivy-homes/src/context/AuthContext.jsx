import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginRequest,
  logout as logoutRequest,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token")
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [token]);

  async function login(email, password) {
    const data = await loginRequest(email, password);

    const accessToken =
      data.access_token ||
      data.token;

    const refreshToken = data.refresh_token;

    if (!accessToken) {
      throw new Error(
        "Login response did not contain an access token."
      );
    }

    if (!refreshToken) {
      throw new Error(
        "Login response did not contain a refresh token."
      );
    }

    setToken(accessToken);

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  }

  async function logout() {
    await logoutRequest();

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}