"use client";

import React, { useState, useEffect } from "react";
import { Book } from "@/lib/api";
import { uploadImageToImgbb } from "@/lib/upload";
import { X, Save, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updatedData: Partial<Book>) => Promise<void>;
  book: Book | null;
  isSaving: boolean;
}

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export default function EditBookModal({
  isOpen,
  onClose,
  onSave,
  book,
  isSaving,
}: EditBookModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setCategory(book.category || "Fiction");
      setImage(book.image || "");
      setDescription(book.description || "");
      setCopies(book.copies || 1);
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.loading("Uploading cover image...", { id: "upload" });
      const uploadedUrl = await uploadImageToImgbb(file);
      setImage(uploadedUrl);
      toast.success("Image uploaded successfully!", { id: "upload" });
    } catch {
      toast.error("Failed to upload image.", { id: "upload" });
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

    await onSave(book._id, {
      title,
      author,
      category,
      image,
      description,
      copies: Number(copies),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden p-6 sm:p-8 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
              Edit Book Details
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Update library catalog information for &ldquo;{book.title}&rdquo;
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Book Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Copies */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Total Available Copies *
              </label>
              <input
                type="number"
                min={0}
                required
                value={copies}
                onChange={(e) => setCopies(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Book Image Upload / URL */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Book Cover Image *
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="url"
                  required
                  placeholder="https://example.com/cover.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <label className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-stone-300 dark:border-slate-700 rounded-xl text-stone-700 dark:text-stone-300 text-sm font-medium cursor-pointer transition-colors shrink-0">
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
                  alt="Cover Preview"
                  className="w-10 h-14 object-cover rounded-md shadow-sm"
                />
                <span className="text-xs text-stone-500 truncate">{image}</span>
              </div>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Short Description *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex space-x-3 justify-end border-t border-stone-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-stone-300 text-sm font-medium hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
