"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Borrow, api } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmModal from "@/components/ConfirmModal";
import { 
  BookmarkCheck, 
  RotateCcw, 
  Calendar, 
  BookOpen, 
  Clock 
} from "lucide-react";
import toast from "react-hot-toast";

export default function MyBorrowsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);

  // Return modal state
  const [returningBorrow, setReturningBorrow] = useState<Borrow | null>(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    document.title = "BookNook | My Borrows";

    if (!authLoading && !user) {
      router.push("/login?redirect=/my-borrows");
    }
  }, [user, authLoading, router]);

  const loadBorrows = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.getMyBorrows();
      if (res.success && res.data) {
        setBorrows(res.data);
      }
    } catch {
      toast.error("Failed to load your borrowed books.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadBorrows();
    }
  }, [user, loadBorrows]);

  const handleReturnClick = (borrow: Borrow) => {
    setReturningBorrow(borrow);
    setIsReturnModalOpen(true);
  };

  const handleConfirmReturn = async () => {
    if (!returningBorrow) return;

    try {
      setIsReturning(true);
      const res = await api.returnBook(returningBorrow._id);
      if (res.success) {
        toast.success(res.message || "Book returned successfully!");
        setBorrows((prev) => prev.filter((b) => b._id !== returningBorrow._id));
        setIsReturnModalOpen(false);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to return book.";
      toast.error(errorMsg);
    } finally {
      setIsReturning(false);
    }
  };

  if (authLoading || !user) {
    return <LoadingSpinner message="Checking reader session..." />;
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Active Loans</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-1">
            My Borrows
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            View your active borrowings, monitor due return dates, and return finished books.
          </p>
        </div>

        <Link
          href="/books"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-medium text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse More Books</span>
        </Link>
      </div>

      {/* Main Content: Table / Cards */}
      {loading ? (
        <LoadingSpinner message="Retrieving borrowed books..." />
      ) : borrows.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-800/50 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  <th className="py-4 px-6">Book</th>
                  <th className="py-4 px-6">Borrow Date</th>
                  <th className="py-4 px-6">Return Due Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800 text-sm">
                {borrows.map((borrow) => {
                  const dueDate = new Date(borrow.returnDate);
                  const isPastDue = dueDate.getTime() < Date.now();

                  return (
                    <tr key={borrow._id} className="hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={borrow.bookImage}
                            alt={borrow.bookTitle}
                            className="w-12 h-16 object-cover rounded-lg shadow-sm shrink-0"
                          />
                          <div className="overflow-hidden max-w-xs">
                            <span className="font-serif font-bold text-stone-900 dark:text-white truncate block">
                              {borrow.bookTitle}
                            </span>
                            <span className="text-xs text-stone-500 dark:text-stone-400">
                              Loan ID: #{borrow._id.substring(0, 8)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-stone-600 dark:text-stone-300">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>{new Date(borrow.borrowDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-stone-600 dark:text-stone-300">
                        <div className="flex items-center space-x-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{dueDate.toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {isPastDue ? (
                          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">
                            Due Today
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            Active Loan
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleReturnClick(borrow)}
                          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-semibold transition-colors shadow-sm"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Return Book</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-stone-100 dark:divide-slate-800">
            {borrows.map((borrow) => {
              const dueDate = new Date(borrow.returnDate);

              return (
                <div key={borrow._id} className="p-4 space-y-3">
                  <div className="flex space-x-3.5">
                    <img
                      src={borrow.bookImage}
                      alt={borrow.bookTitle}
                      className="w-14 h-20 object-cover rounded-lg shadow-sm shrink-0"
                    />
                    <div className="overflow-hidden flex-grow space-y-1">
                      <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white truncate">
                        {borrow.bookTitle}
                      </h4>
                      <p className="text-xs text-stone-500">
                        Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        Due: {dueDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => handleReturnClick(borrow)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold shadow"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Return Book</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-slate-900/40 rounded-3xl border border-stone-200 dark:border-slate-800 space-y-4">
          <BookmarkCheck className="w-12 h-12 mx-auto text-stone-400" />
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
            No active borrowed books
          </h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            You currently have no borrowed titles. Explore the library collection and pick your next read!
          </p>
          <Link
            href="/books"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Library Catalog</span>
          </Link>
        </div>
      )}

      {/* Return Confirmation Modal */}
      <ConfirmModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        onConfirm={handleConfirmReturn}
        title="Return Borrowed Book"
        message={`Are you ready to return "${returningBorrow?.bookTitle}"? This will return the title and make another copy available for other readers.`}
        confirmText="Confirm Return"
        isDeleting={isReturning}
      />
    </div>
  );
}
