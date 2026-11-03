"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Mail, Lock, User, ImageIcon, UserPlus, AlertCircle, Check } from "lucide-react";

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

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Register";
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Live password validation checks
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setFormError("Please enter a valid email address.");
      return;
    }

    // Password Validation Rules:
    // 1. Length must be at least 6 characters
    // 2. Must have an Uppercase letter
    // 3. Must have a Lowercase letter
    if (!hasMinLength) {
      setFormError("Password length must be at least 6 characters.");
      return;
    }
    if (!hasUppercase) {
      setFormError("Password must include at least one uppercase letter (A-Z).");
      return;
    }
    if (!hasLowercase) {
      setFormError("Password must include at least one lowercase letter (a-z).");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await register(
        name.trim(),
        email.trim(),
        photoUrl.trim() || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        password
      );

      if (success) {
        // Navigate to login page on success
        router.push("/login");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed. Please check your details.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setIsGoogleSubmitting(true);
      setFormError("");
      const success = await loginWithGoogle();
      if (success) {
        router.push("/");
      }
    } catch {
      setFormError("Google sign-in could not be completed.");
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12">
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-7 sm:p-10 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/30 mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Create Reader Account
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Join the BookNook community to borrow and share literary gems
          </p>
        </div>

        {/* Error message */}
        {formError && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center space-x-2.5 text-red-600 dark:text-red-400 text-xs sm:text-sm animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Jane Austen"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormError("");
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Email Address *
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

          {/* Photo-URL */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Photo URL <span className="text-stone-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Password *
            </label>
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

            {/* Visual Password Criteria Checklist */}
            <div className="mt-2.5 p-3 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              <div className={`flex items-center space-x-2 ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-white ${hasMinLength ? "bg-emerald-500" : "bg-stone-300 dark:bg-slate-700"}`}>
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>At least 6 characters</span>
              </div>
              <div className={`flex items-center space-x-2 ${hasUppercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-white ${hasUppercase ? "bg-emerald-500" : "bg-stone-300 dark:bg-slate-700"}`}>
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>One uppercase letter (A-Z)</span>
              </div>
              <div className={`flex items-center space-x-2 ${hasLowercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-white ${hasLowercase ? "bg-emerald-500" : "bg-stone-300 dark:bg-slate-700"}`}>
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>One lowercase letter (a-z)</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isSubmitting ? "Creating Account..." : "Register"}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-stone-400">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Google Social Login */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={isGoogleSubmitting}
          className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-slate-700 bg-white hover:bg-stone-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-stone-700 dark:text-stone-200 text-sm font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50"
        >
          <GoogleLogo />
          <span>{isGoogleSubmitting ? "Connecting..." : "Sign up with Google"}</span>
        </button>

        {/* Link for Login */}
        <div className="mt-8 text-center text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
