"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { 
  BookOpen, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  Library, 
  BookmarkCheck,
  ChevronDown
} from "lucide-react";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/", isPrivate: false },
    { label: "All Books", href: "/books", isPrivate: false },
    { label: "Add Book", href: "/add-book", isPrivate: true },
    { label: "My Books", href: "/my-books", isPrivate: true },
    { label: "My Borrows", href: "/my-borrows", isPrivate: true },
  ];

  const visibleLinks = navLinks.filter(link => !link.isPrivate || Boolean(user));

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <Link 
                href="/" 
                className="flex items-center space-x-2.5 text-stone-900 dark:text-white group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                    Book<span className="text-amber-600 dark:text-amber-400">Nook</span>
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-medium text-stone-500 dark:text-stone-400 -mt-1 hidden sm:block">
                    Online Library
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {visibleLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 font-semibold"
                        : "text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100/70 dark:hover:bg-slate-800/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Controls: Theme Toggle & Auth */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className="p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
                ) : (
                  <Moon className="w-5 h-5 text-stone-700 transition-transform rotate-0 hover:-rotate-12" />
                )}
              </button>

              {/* Authentication Status */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-1 pl-2 pr-2.5 rounded-full border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  >
                    <img
                      src={user.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-amber-500"
                    />
                    <span className="hidden sm:inline text-xs font-medium text-stone-800 dark:text-stone-200 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-stone-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 border-b border-stone-100 dark:border-slate-700/60">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Signed in as</p>
                        <p className="text-sm font-semibold text-stone-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileModalOpen(true);
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-slate-700/50 hover:text-amber-700 dark:hover:text-amber-400 text-left transition-colors"
                        >
                          <UserIcon className="w-4 h-4 mr-2.5 text-amber-600 dark:text-amber-400" />
                          My Profile
                        </button>
                        <Link
                          href="/my-borrows"
                          className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-slate-700/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                        >
                          <BookmarkCheck className="w-4 h-4 mr-2.5 text-amber-600 dark:text-amber-400" />
                          My Borrows
                        </Link>
                        <Link
                          href="/my-books"
                          className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-slate-700/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                        >
                          <Library className="w-4 h-4 mr-2.5 text-amber-600 dark:text-amber-400" />
                          My Books
                        </Link>
                      </div>

                      <div className="border-t border-stone-100 dark:border-slate-700/60 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2.5" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 rounded-xl shadow-sm hover:shadow transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile menu hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {!user && (
              <div className="pt-4 border-t border-stone-200 dark:border-slate-800 flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="w-full text-center py-2.5 border border-stone-300 dark:border-slate-700 rounded-xl text-stone-700 dark:text-stone-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center py-2.5 bg-amber-600 text-white rounded-xl font-medium shadow"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* User Profile Modal */}
      <ProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
        user={user} 
      />
    </>
  );
}
