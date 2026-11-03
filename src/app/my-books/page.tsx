"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Book, api } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmModal from "@/components/ConfirmModal";
import EditBookModal from "@/components/EditBookModal";
import { 
  Library, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Layers
} from "lucide-react";
import toast from "react-hot-toast";

export default function MyBooksPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete modal state
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | My Books";

    if (!authLoading && !user) {
      router.push("/login?redirect=/my-books");
    }
  }, [user, authLoading, router]);

  const loadMyBooks = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.getBooks({ userEmail: user.email });
      if (res.success && res.data) {
        setBooks(res.data);
      }
    } catch {
      toast.error("Failed to load your added books.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadMyBooks();
    }
  }, [user, loadMyBooks]);

  // Open Edit Modal
  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  // Submit Edit
  const handleSaveEdit = async (id: string, updatedData: Partial<Book>) => {
    try {
      setIsSavingEdit(true);
      const res = await api.updateBook(id, updatedData);
      if (res.success && res.data) {
        toast.success(res.message || "Book updated successfully!");
        setBooks((prev) =>
          prev.map((b) => (b._id === id ? { ...b, ...res.data } : b))
        );
        setIsEditModalOpen(false);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update book.";
      toast.error(errorMsg);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Open Delete Modal
  const handleDeleteClick = (book: Book) => {
    setDeletingBook(book);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingBook) return;

    try {
      setIsDeleting(true);
      const res = await api.deleteBook(deletingBook._id);
      if (res.success) {
        toast.success(res.message || "Book deleted successfully!");
        setBooks((prev) => prev.filter((b) => b._id !== deletingBook._id));
        setIsDeleteModalOpen(false);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to delete book.";
      toast.error(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading || !user) {
    return <LoadingSpinner message="Checking reader session..." />;
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
            <Library className="w-3.5 h-3.5" />
            <span>Curator Dashboard</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-1">
            My Added Books
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Manage, update catalog descriptions, or remove titles you have contributed.
          </p>
        </div>

        <Link
          href="/add-book"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-medium text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Main Content: Table / Cards */}
      {loading ? (
        <LoadingSpinner message="Loading your cataloged books..." />
      ) : books.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-800/50 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  <th className="py-4 px-6">Book</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Inventory</th>
                  <th className="py-4 px-6">Added Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800 text-sm">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-lg shadow-sm shrink-0"
                        />
                        <div className="overflow-hidden max-w-xs">
                          <Link
                            href={`/books/${book._id}`}
                            className="font-serif font-bold text-stone-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 truncate block transition-colors"
                          >
                            {book.title}
                          </Link>
                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                            By {book.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-700">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center text-xs font-medium text-stone-700 dark:text-stone-300">
                        <Layers className="w-3.5 h-3.5 mr-1 text-amber-600" />
                        {book.copies} {book.copies === 1 ? 'copy' : 'copies'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-stone-500 dark:text-stone-400">
                      {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "Recently"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(book)}
                          className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                          title="Edit Book"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(book)}
                          className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Delete Book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden divide-y divide-stone-100 dark:divide-slate-800">
            {books.map((book) => (
              <div key={book._id} className="p-4 space-y-3">
                <div className="flex space-x-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-14 h-20 object-cover rounded-lg shadow-sm shrink-0"
                  />
                  <div className="overflow-hidden flex-grow space-y-1">
                    <Link
                      href={`/books/${book._id}`}
                      className="font-serif font-bold text-sm text-stone-900 dark:text-white truncate block"
                    >
                      {book.title}
                    </Link>
                    <p className="text-xs text-stone-500">By {book.author}</p>
                    <div className="flex items-center space-x-2 text-xs text-stone-600 dark:text-stone-300 pt-1">
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-slate-800 text-[10px]">
                        {book.category}
                      </span>
                      <span>{book.copies} copies</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-slate-800">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 text-xs font-medium text-stone-700 dark:text-stone-300"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(book)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-xs font-medium text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-slate-900/40 rounded-3xl border border-stone-200 dark:border-slate-800 space-y-4">
          <Library className="w-12 h-12 mx-auto text-stone-400" />
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
            You haven&apos;t added any books yet
          </h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            Share your favorite reads with the BookNook community by contributing your first book.
          </p>
          <Link
            href="/add-book"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book from Library"
        message={`Are you sure you want to remove "${deletingBook?.title}" from BookNook? This action cannot be undone.`}
        confirmText="Yes, Delete Book"
        isDeleting={isDeleting}
      />

      {/* Custom Edit Modal */}
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        book={editingBook}
        isSaving={isSavingEdit}
      />
    </div>
  );
}
