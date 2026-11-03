"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

// Google G logo component
function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login, loginWithGoogle, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Login";
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !password) {
      setFormError("Please enter both your email address and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await login(email, password);
      if (success) {
        router.push(redirectUrl);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid credentials. Please verify and try again.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleSubmitting(true);
      setFormError("");
      const success = await loginWithGoogle();
      if (success) {
        router.push(redirectUrl);
      }
    } catch {
      setFormError("Google sign-in could not be completed. Please try again.");
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast("Password reset instructions are disabled for examination convenience.", {
      icon: "ℹ️",
    });
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-14">
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-7 sm:p-10 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/30 mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Sign in to access your borrowed books and library dashboard
          </p>
        </div>

        {/* In-Form Error Display */}
        {formError && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center space-x-2.5 text-red-600 dark:text-red-400 text-xs sm:text-sm animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="reader@booknook.org"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError("");
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
              >
                Forget Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormError("");
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSubmitting ? "Signing in..." : "Login"}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-stone-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Social Login Button (Google only) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleSubmitting}
          className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-slate-700 bg-white hover:bg-stone-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-stone-700 dark:text-stone-200 text-sm font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50"
        >
          <GoogleLogo />
          <span>{isGoogleSubmitting ? "Connecting..." : "Sign in with Google"}</span>
        </button>

        {/* Register Redirect Link */}
        <div className="mt-8 text-center text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Preparing login..." />}>
      <LoginContent />
    </Suspense>
  );
}
