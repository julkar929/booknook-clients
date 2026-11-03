"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Book, api } from "@/lib/api";
import BorrowModal from "@/components/BorrowModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { 
  ArrowLeft, 
  User, 
  Tag, 
  Layers, 
  ShieldCheck, 
  BookmarkCheck,
  AlertCircle 
} from "lucide-react";
import toast from "react-hot-toast";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { user, isLoading: authLoading } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);

  useEffect(() => {
    // Auth Guard: If authentication has finished loading and no user is logged in, redirect to login
    if (!authLoading && !user) {
      router.push(`/login?redirect=/books/${id}`);
    }
  }, [user, authLoading, id, router]);

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        const res = await api.getBook(id);
        if (res.success && res.data) {
          setBook(res.data);
          document.title = `BookNook | ${res.data.title}`;
        }
      } catch {
        toast.error("Book not found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBook();
    }
  }, [id]);

  const handleBorrowClick = () => {
    if (!user) {
      router.push(`/login?redirect=/books/${id}`);
      return;
    }
    setBorrowModalOpen(true);
  };

  const handleConfirmBorrow = async (returnDate: string) => {
    if (!book) return;

    try {
      setIsBorrowing(true);
      const res = await api.borrowBook(book._id, returnDate);
      if (res.success) {
        toast.success(res.message || "Book borrowed successfully!");
        setBorrowModalOpen(false);
        // Decrement copies locally
        setBook((prev) => prev ? { ...prev, copies: Math.max(0, prev.copies - 1) } : prev);
        // Navigate to my borrows
        router.push("/my-borrows");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to borrow book.";
      toast.error(errorMsg);
    } finally {
      setIsBorrowing(false);
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner message="Retrieving book details..." />;
  }

  if (!book) {
    return (
      <div className="text-center py-20 bg-stone-50 dark:bg-slate-900/40 rounded-3xl border border-stone-200 dark:border-slate-800 space-y-4">
        <AlertCircle className="w-12 h-12 mx-auto text-amber-600" />
        <h2 className="font-serif text-2xl font-bold">Book Not Found</h2>
        <p className="text-sm text-stone-500">The requested book does not exist in our library archives.</p>
        <Link
          href="/books"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-medium hover:bg-amber-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Books</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = book.copies === 0;

  return (
    <div className="space-y-8 sm:space-y-10 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/books"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main Book Card */}
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Book Cover Image */}
          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Copies availability badge */}
            <div className="mt-4 flex items-center justify-between p-3.5 bg-stone-50 dark:bg-slate-800/80 rounded-2xl border border-stone-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center">
                <Layers className="w-4 h-4 mr-1.5 text-amber-600 dark:text-amber-400" />
                Available Inventory
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isOutOfStock
                    ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                }`}
              >
                {isOutOfStock ? "Not Available" : `${book.copies} ${book.copies === 1 ? 'Copy' : 'Copies'} In Stock`}
              </span>
            </div>
          </div>

          {/* Right Column: Book Metadata & Borrow Action */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>{book.category}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white leading-tight">
                {book.title}
              </h1>
              <p className="flex items-center text-sm font-medium text-stone-600 dark:text-stone-300 mt-2">
                <User className="w-4 h-4 mr-1.5 text-amber-600 dark:text-amber-400" />
                Written by <span className="font-bold ml-1 text-stone-900 dark:text-white">{book.author}</span>
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
                Synopsis & Overview
              </h3>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Catalog Contributor info ("who added it") */}
            <div className="p-4 bg-stone-50 dark:bg-slate-800/60 rounded-2xl border border-stone-200 dark:border-slate-700 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              <span className="font-bold text-stone-900 dark:text-white flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600 dark:text-emerald-400" />
                Catalog Curator Details
              </span>
              <p>Added by: <span className="font-medium text-stone-800 dark:text-stone-200">{book.userName}</span></p>
              <p>Curator Contact: <span className="font-mono text-stone-500">{book.userEmail}</span></p>
              {book.createdAt && (
                <p className="text-stone-400">
                  Added on {new Date(book.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Borrow Action Button */}
            <div className="pt-4">
              {isOutOfStock ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-stone-300 dark:bg-slate-800 text-stone-500 dark:text-stone-400 font-semibold text-sm cursor-not-allowed shadow-none"
                >
                  Not Available (Out of Stock)
                </button>
              ) : (
                <button
                  onClick={handleBorrowClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <BookmarkCheck className="w-5 h-5" />
                  <span>Borrow This Book</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {user && (
        <BorrowModal
          isOpen={borrowModalOpen}
          onClose={() => setBorrowModalOpen(false)}
          onConfirm={handleConfirmBorrow}
          book={book}
          user={user}
          isSubmitting={isBorrowing}
        />
      )}
    </div>
  );
}
