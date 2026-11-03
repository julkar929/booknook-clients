"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BookX, Home, Search } from "lucide-react";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "BookNook | Page Not Found";
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
          <BookX className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
            Error 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
            Lost in the Stacks
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            The literary page or volume you are looking for has been misplaced or moved to another shelf in our library.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300 text-sm font-medium transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
