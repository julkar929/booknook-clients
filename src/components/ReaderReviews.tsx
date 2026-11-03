import React from "react";
import { Star, Quote, Award, Users, BookOpen } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Elena Rostova",
    role: "Literature Enthusiast",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "BookNook completely changed how I read. I can check out rare astrophysics titles and modern fiction without any hassle. The real-time copies counter is incredibly handy!",
    book: "The Midnight Library",
  },
  {
    id: 2,
    name: "Dr. Marcus Chen",
    role: "Historian & Educator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Contributing our departmental reading list to BookNook was seamless. The community is deeply respectful of return dates, and seeing copies replenish automatically is wonderfully engineered.",
    book: "Sapiens: A Brief History of Humankind",
  },
  {
    id: 3,
    name: "Sophie Bennett",
    role: "Children's Book Club Host",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Finding high-quality reads for my weekend reading circles has never been easier. The clean user interface and prompt return reminders keep our club organized and inspired.",
    book: "The Little Prince",
  },
];

const STATS = [
  { label: "Community Books", value: "2,400+", icon: BookOpen },
  { label: "Active Readers", value: "8,500+", icon: Users },
  { label: "Successful Borrows", value: "19,200+", icon: Award },
];

export default function ReaderReviews() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
          Community Stories
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
          Reader Reviews & Impressions
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
          Hear from passionate readers, educators, and curators who make BookNook their literary home every single day.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="w-8 h-8 text-stone-200 dark:text-slate-700 absolute -top-3 -left-2 -z-0 opacity-80" />
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic relative z-10">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Author info */}
            <div className="pt-6 mt-6 border-t border-stone-100 dark:border-slate-700/60 flex items-center space-x-3.5">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-500"
              />
              <div className="overflow-hidden">
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white truncate">
                  {rev.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                  {rev.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Library Metrics Bar */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-700 dark:to-amber-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-amber-500/40">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className={`flex flex-col items-center ${i > 0 ? "pt-6 sm:pt-0" : ""}`}>
                <Icon className="w-8 h-8 mb-3 text-amber-200" />
                <span className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-amber-100 uppercase tracking-wider font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
