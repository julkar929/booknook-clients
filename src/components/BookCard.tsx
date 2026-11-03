"use client";

import React from "react";
import Link from "next/link";
import { Book } from "@/lib/api";
import { BookOpen, User, Tag, Layers } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const isOutOfStock = book.copies === 0;

  const categoryColors: Record<string, string> = {
    Fiction: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    Science: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    History: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    Kids: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    Others: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700",
  };

  const badgeClass = categoryColors[book.category] || categoryColors.Others;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800/80 rounded-2xl border border-stone-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500/50 transition-all duration-300 overflow-hidden group">
      {/* Book Cover Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-slate-900">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${badgeClass}`}>
            <Tag className="w-3 h-3 mr-1" />
            {book.category}
          </span>
        </div>

        {/* Copies Availability Tag */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm border ${
              isOutOfStock
                ? "bg-red-500/90 text-white border-red-600"
                : "bg-white/90 dark:bg-slate-900/90 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-slate-700"
            }`}
          >
            <Layers className="w-3 h-3 mr-1 text-amber-500" />
            {isOutOfStock ? "Out of Stock" : `${book.copies} ${book.copies === 1 ? 'copy' : 'copies'}`}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {book.title}
          </h3>
          <p className="flex items-center text-xs text-stone-500 dark:text-stone-400 font-medium">
            <User className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="truncate">{book.author}</span>
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-2 border-t border-stone-100 dark:border-slate-700/60">
          <Link
            href={`/books/${book._id}`}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
