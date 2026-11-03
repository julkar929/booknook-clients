"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HomeBannerSlider from "@/components/HomeBannerSlider";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import ReaderReviews from "@/components/ReaderReviews";
import BookCard from "@/components/BookCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Book, api } from "@/lib/api";
import { Sparkles, ArrowRight, Library } from "lucide-react";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "BookNook | Home";

    async function fetchNewArrivals() {
      try {
        setLoading(true);
        // Load latest 6 books sorted by newest
        const res = await api.getBooks({ limit: 6, sort: "newest" });
        if (res.success && res.data) {
          setBooks(res.data);
        }
      } catch (err) {
        console.error("Failed to load new arrivals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewArrivals();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Swiper Banner */}
      <HomeBannerSlider />

      {/* 2. Dynamic New Arrivals Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Off The Press</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
              New Arrivals
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl">
              Explore the latest six literary discoveries recently cataloged by our passionate community curators.
            </p>
          </div>
          <Link
            href="/books"
            className="hidden sm:inline-flex items-center space-x-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 group"
          >
            <span>See All Books</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Books Grid or Loading */}
        {loading ? (
          <LoadingSpinner message="Fetching newest arrivals from the library..." />
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 dark:bg-slate-900/50 rounded-3xl border border-stone-200 dark:border-slate-800">
            <Library className="w-12 h-12 mx-auto text-stone-400 mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              No books cataloged yet
            </h3>
            <p className="text-sm text-stone-500 mt-1 mb-4">
              Be the first reader to add a book to our library!
            </p>
            <Link
              href="/add-book"
              className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-semibold shadow hover:bg-amber-700 transition-colors"
            >
              Add a Book
            </Link>
          </div>
        )}

        {/* "See All Books" button below cards */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all group"
          >
            <span>See All Books</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. Extra Section 1: How Borrowing Works */}
      <HowBorrowingWorks />

      {/* 4. Extra Section 2: Reader Reviews & Community Metrics */}
      <ReaderReviews />
    </div>
  );
}
