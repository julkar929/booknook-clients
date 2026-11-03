import React from "react";
import { Search, BookCheck, Sparkles, RotateCcw } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Discover & Select",
    description: "Explore our catalog categorized by Fiction, Science, History, and more. Filter by genre or search by author to find your next great read.",
  },
  {
    step: "02",
    icon: BookCheck,
    title: "Borrow Instantly",
    description: "Hit 'Borrow This Book' to reserve your title instantly. Real-time inventory ensures copies are guaranteed for your selected reading window.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Read & Enjoy",
    description: "Immerse yourself in new knowledge and enchanting stories. Track your borrowed titles anytime from your personal 'My Borrows' dashboard.",
  },
  {
    step: "04",
    icon: RotateCcw,
    title: "Seamless Return",
    description: "Finished your journey? Return your book in one click. Copies are automatically replenished for the next enthusiastic community member.",
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="py-16 sm:py-20 bg-stone-50/60 dark:bg-slate-900/40 rounded-3xl border border-stone-200/80 dark:border-slate-800/80 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
          Simple & Frictionless
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
          How Borrowing Works
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
          Our online library philosophy is simple: add a book, borrow a book, return a book. Here is how your reading journey unfolds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {STEPS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-7 border border-stone-200 dark:border-slate-700/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-2xl font-black text-stone-300 dark:text-slate-700">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
