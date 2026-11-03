import React from "react";
import { BookOpen } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading books from library..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-amber-200 dark:border-slate-800 border-t-amber-600 dark:border-t-amber-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <BookOpen className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
        {message}
      </p>
    </div>
  );
}
