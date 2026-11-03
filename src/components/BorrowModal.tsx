"use client";

import React, { useState } from "react";
import { Book, User } from "@/lib/api";
import { BookOpen, Calendar, Mail, User as UserIcon, X, CheckCircle } from "lucide-react";

interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (returnDate: string) => Promise<void>;
  book: Book;
  user: User;
  isSubmitting: boolean;
}

export default function BorrowModal({
  isOpen,
  onClose,
  onConfirm,
  book,
  user,
  isSubmitting,
}: BorrowModalProps) {
  // Default return date: 7 days from today
  const defaultDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const minDueDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [returnDate, setReturnDate] = useState(defaultDueDate);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(returnDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                Borrow Book
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Confirm your reservation details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book summary pill */}
        <div className="my-5 p-3.5 bg-stone-50 dark:bg-slate-800/60 rounded-2xl border border-stone-100 dark:border-slate-800 flex items-center space-x-3.5">
          <img
            src={book.image}
            alt={book.title}
            className="w-12 h-16 object-cover rounded-lg shadow-sm"
          />
          <div className="overflow-hidden">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white truncate">
              {book.title}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
              By {book.author} • {book.category}
            </p>
            <span className="inline-block mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              Available: {book.copies} {book.copies === 1 ? 'copy' : 'copies'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name (Read-Only) */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Borrower Name
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                readOnly
                value={user.name}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 text-sm font-medium cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* User Email (Read-Only) */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Borrower Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                readOnly
                value={user.email}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 text-sm font-medium cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* Return Date Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Select Return Due Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
              <input
                type="date"
                required
                min={minDueDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
              Standard borrowing period is 7 days. You can renew or return at any time.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex space-x-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-stone-300 text-sm font-medium hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white text-sm font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? "Processing..." : "Confirm Borrow"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
