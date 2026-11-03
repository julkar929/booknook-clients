import React from "react";
import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

// Modern X Logo SVG Component
function XLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function GithubLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 dark:border-slate-800 bg-stone-100/60 dark:bg-slate-900/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Book<span className="text-amber-600 dark:text-amber-400">Nook</span>
              </span>
            </Link>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              BookNook is a welcoming digital sanctuary for bibliophiles. Discover curated literary treasures, share personal collections, and borrow inspiring works with seamless ease.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Home Catalog
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/books?category=Fiction" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Fiction Classics
                </Link>
              </li>
              <li>
                <Link href="/books?category=Science" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Science & Innovation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>42 Bibliophile Boulevard, Alexandria, VA 22314</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>+1 (800) 555-NOOK</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>curator@booknook.library</span>
              </div>
            </div>
          </div>

          {/* Social Links & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider">
              Connect With Us
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Follow our community updates, reading clubs, and author spotlights.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-lg bg-stone-200 dark:bg-slate-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all"
              >
                <XLogo className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-stone-200 dark:bg-slate-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-white hover:bg-[#1877F2] transition-all"
              >
                <FacebookLogo className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-stone-200 dark:bg-slate-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 transition-all"
              >
                <InstagramLogo className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-stone-200 dark:bg-slate-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-white hover:bg-stone-900 dark:hover:bg-slate-700 transition-all"
              >
                <GithubLogo className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright separator */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} BookNook Online Library. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer">Borrowing Terms</span>
            <span className="hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer">Community Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
