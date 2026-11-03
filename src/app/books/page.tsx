"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Book, api } from "@/lib/api";
import { Search, Filter, BookOpen, Layers } from "lucide-react";

const CATEGORIES = ["All", "Fiction", "Science", "History", "Kids", "Others"];

function BooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "BookNook | All Books";
  }, []);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const res = await api.getBooks({
          category: selectedCategory === "All" ? undefined : selectedCategory,
          search: searchTerm ? searchTerm : undefined,
          sort: "newest",
        });
        if (res.success && res.data) {
          setBooks(res.data);
        }
      } catch (err) {
        console.error("Failed to load library books:", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadBooks();
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Header and Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Full Library Archive</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white">
          All Books
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
          Browse through our comprehensive collection of literary treasures. Filter by your favorite genres or search directly for authors and titles.
        </p>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Books Count Pill */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-500 dark:text-stone-400 self-end md:self-center">
            <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Showing {books.length} Books</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
          <div className="flex items-center text-xs font-semibold text-stone-400 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 mr-1" />
            <span>Genre:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Books Grid (3 cards per row on desktop) */}
      {loading ? (
        <LoadingSpinner message="Searching library catalog..." />
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-slate-900/40 rounded-3xl border border-stone-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 mx-auto text-stone-400 mb-3" />
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
            No matching books found
          </h3>
          <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchTerm("");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold shadow hover:bg-amber-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading catalog..." />}>
      <BooksContent />
    </Suspense>
  );
}
