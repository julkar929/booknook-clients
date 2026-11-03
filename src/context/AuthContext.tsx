"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, photoUrl: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  completeGoogleLogin: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  loginWithGoogle: async () => false,
  completeGoogleLogin: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Re-hydrate authentication on page load/reload
  useEffect(() => {
    async function loadSession() {
      try {
        const storedToken = localStorage.getItem("booknook_token");
        const storedUser = localStorage.getItem("booknook_user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Verify with server in the background
          try {
            const meRes = await api.getMe();
            if (meRes.success && meRes.user) {
              setUser(meRes.user);
              localStorage.setItem("booknook_user", JSON.stringify(meRes.user));
            }
          } catch (err) {
            console.warn("Session verification warning:", err);
          }
        }
      } catch (err) {
        console.error("Failed to restore auth session:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSession();
  }, []);

  const saveAuthSession = (authToken: string, authUser: User) => {
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem("booknook_token", authToken);
    localStorage.setItem("booknook_user", JSON.stringify(authUser));
    document.cookie = `booknook_token=${authToken}; path=/; max-age=604800; SameSite=Lax`;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.login({ email, password });
      if (res.success && res.token && res.user) {
        saveAuthSession(res.token, res.user);
        toast.success(res.message || "Logged in successfully!");
        return true;
      }
      return false;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid email or password.";
      toast.error(message);
      throw err;
    }
  };

  const register = async (name: string, email: string, photoUrl: string, password: string): Promise<boolean> => {
    try {
      const res = await api.register({ name, email, photoUrl, password });
      if (res.success) {
        toast.success(res.message || "Registration successful! Please log in.");
        return true;
      }
      return false;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed.";
      toast.error(message);
      throw err;
    }
  };

  // step 1: Redirect the user to the actual Google login page
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/auth/google-callback",
      });
      return false; // The actual redirection will happen, so we don't return true here.
    } catch (err) {
      toast.error("Google sign in failed.");
      throw err;
    }
  };

  // step 2: From the Google callback page, we complete the login process
  const completeGoogleLogin = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/booknook-token", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success && data.token && data.user) {
        saveAuthSession(data.token, data.user);
        toast.success(data.message || "Signed in with Google!");
        return true;
      }
      toast.error(data.message || "Google sign in failed.");
      return false;
    } catch {
      toast.error("Google sign in failed.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("booknook_token");
    localStorage.removeItem("booknook_user");
    document.cookie = "booknook_token=; path=/; max-age=0";
    authClient.signOut().catch(() => {});
    toast.success("Logged out successfully.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        loginWithGoogle,
        completeGoogleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}