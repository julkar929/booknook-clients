"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Uncover Rare Stories & Literary Classics",
    subtitle: "Curated Global Library",
    text: "Step into our digital sanctuary where timeless masterpieces, groundbreaking scientific inquiries, and inspiring memoirs await every curious mind.",
    image: "https://images.unsplash.com/photo-1507842229451-7f01be7ff6ab?auto=format&fit=crop&w=1600&q=80",
    badge: "Featured Collection",
  },
  {
    id: 2,
    title: "Borrow Freely, Read Deeply, Expand Horizons",
    subtitle: "Effortless Book Lending",
    text: "Experience modern library access with zero friction. Borrow thought-provoking titles with a single click, read at your pace, and return whenever you're ready.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    badge: "Zero Friction Borrowing",
  },
  {
    id: 3,
    title: "Share Your Treasures with Fellow Readers",
    subtitle: "Community Driven Archive",
    text: "Enrich our growing community library by cataloging your personal favorites. Share inspiring discoveries and ignite imagination across the world.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
    badge: "Community Powered",
  },
];

export default function HomeBannerSlider() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-slate-800">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="w-full h-[450px] sm:h-[520px] md:h-[580px]"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-start">
              {/* Slide Background Image with Vignette Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/30 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/40" />
              </div>

              {/* Slide Text Content */}
              <div className="relative z-10 max-w-2xl px-6 sm:px-12 md:px-16 text-white space-y-4 sm:space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-stone-300 max-w-xl leading-relaxed">
                  {slide.text}
                </p>

                <div className="pt-2 sm:pt-4">
                  <Link
                    href="/books"
                    className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <BookOpen className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                    <span>Browse Books</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
