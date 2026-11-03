"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { uploadImageToImgbb } from "@/lib/upload";
import LoadingSpinner from "@/components/LoadingSpinner";
import { 
  BookPlus, 
  Upload, 
  User, 
  Mail, 
  Layers, 
  Tag, 
  Image as ImageIcon,
  CheckCircle 
} from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState<number>(3);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Add Book";

    if (!authLoading && !user) {
      router.push("/login?redirect=/add-book");
    }
  }, [user, authLoading, router]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.loading("Uploading image via ImgBB service...", { id: "upload-toast" });
      const uploadedUrl = await uploadImageToImgbb(file);
      setImage(uploadedUrl);
      toast.success("Cover image uploaded successfully!", { id: "upload-toast" });
    } catch {
      toast.error("Failed to upload image.", { id: "upload-toast" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !image.trim() || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (copies < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.addBook({
        title: title.trim(),
        author: author.trim(),
        category,
        image: image.trim(),
        description: description.trim(),
        copies: Number(copies),
      });

      if (res.success) {
        toast.success(res.message || "Book added to BookNook library!");
        router.push("/my-books");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to add book.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return <LoadingSpinner message="Verifying curator session..." />;
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10">
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pb-6 border-b border-stone-100 dark:border-slate-800">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/30 mb-3">
            <BookPlus className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Add a New Book
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Contribute a literary work to our community library collection so fellow readers can explore and borrow it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Book Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Midnight Library"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Author Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Matt Haig"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Category & Total Copies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Total Copies *
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="number"
                  min={1}
                  required
                  value={copies}
                  onChange={(e) => setCopies(parseInt(e.target.value, 10) || 1)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Book Image (Upload to imgbb / URL input) */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Book Cover Image * (Upload via ImgBB or Direct URL)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... or paste image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
                />
              </div>
              <label className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-stone-300 dark:border-slate-700 rounded-xl text-stone-700 dark:text-stone-300 text-sm font-medium cursor-pointer transition-colors shrink-0">
                <Upload className="w-4 h-4 text-amber-600" />
                <span>{isUploading ? "Uploading..." : "Upload File"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            {image && (
              <div className="mt-3 flex items-center space-x-3 p-2 bg-stone-50 dark:bg-slate-800/40 rounded-xl border border-stone-200 dark:border-slate-700">
                <img
                  src={image}
                  alt="Cover preview"
                  className="w-12 h-16 object-cover rounded-lg shadow-sm"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-stone-800 dark:text-stone-200">Cover preview loaded</p>
                  <p className="text-[11px] text-stone-400 truncate">{image}</p>
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Short Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Short Description *
            </label>
            <div className="relative">
              <textarea
                rows={4}
                required
                placeholder="Write an engaging synopsis or note about this book..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Row 5: User Name and Email (Read-Only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                Curator Name (Read-Only)
              </label>
              <div className="flex items-center space-x-2 text-sm font-medium text-stone-800 dark:text-stone-200">
                <User className="w-4 h-4 text-amber-600" />
                <span>{user.name}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                Curator Email (Read-Only)
              </label>
              <div className="flex items-center space-x-2 text-sm font-medium text-stone-800 dark:text-stone-200 font-mono text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-amber-600" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-full flex items-center justify-center space-x-2.5 py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-600/30 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{isSubmitting ? "Adding Book to Catalog..." : "Add Book"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
