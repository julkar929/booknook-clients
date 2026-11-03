"use client";

import React from "react";
import { User } from "@/lib/api";
import { X, Mail, User as UserIcon, Calendar, ShieldCheck } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-700 dark:to-amber-900 px-6 pt-8 pb-14 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-serif text-2xl font-bold">Reader Profile</h3>
          <p className="text-amber-100 text-xs mt-1">BookNook Community Member</p>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="-mt-12 flex items-center space-x-4 mb-6">
            <img
              src={user.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-lg bg-stone-100 dark:bg-slate-800"
            />
            <div className="pt-8">
              <h4 className="text-xl font-bold text-stone-900 dark:text-white leading-tight">
                {user.name}
              </h4>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 mt-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Reader
              </span>
            </div>
          </div>

          <div className="space-y-3.5 bg-stone-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-stone-100 dark:border-slate-800 text-sm">
            <div className="flex items-center text-stone-700 dark:text-stone-300">
              <Mail className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
              <span className="font-mono text-xs sm:text-sm">{user.email}</span>
            </div>
            <div className="flex items-center text-stone-700 dark:text-stone-300">
              <UserIcon className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
              <span>Full Name: {user.name}</span>
            </div>
            <div className="flex items-center text-stone-700 dark:text-stone-300">
              <Calendar className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
              <span>Library Card: #{user.id.substring(0, 8).toUpperCase()}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium hover:bg-stone-800 dark:hover:bg-white transition-all shadow"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
