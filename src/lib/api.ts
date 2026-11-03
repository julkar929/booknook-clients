// BookNook Client API Service

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: 'Fiction' | 'Science' | 'History' | 'Kids' | 'Others' | string;
  image: string;
  description: string;
  copies: number;
  userEmail: string;
  userName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  userName: string;
  borrowDate: string;
  returnDate: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
}

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('booknook_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred during request');
  }

  return data;
}

export const api = {
  // Books API
  async getBooks(params?: { limit?: number; sort?: string; category?: string; search?: string; userEmail?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.userEmail) searchParams.append('userEmail', params.userEmail);

    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return request<{ success: boolean; count: number; data: Book[] }>(`/books${query}`);
  },

  async getBook(id: string) {
    return request<{ success: boolean; data: Book }>(`/books/${id}`);
  },

  async addBook(bookData: {
    title: string;
    author: string;
    category: string;
    image: string;
    description: string;
    copies: number;
  }) {
    return request<{ success: boolean; message: string; data: Book }>('/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  },

  async updateBook(id: string, bookData: Partial<Book>) {
    return request<{ success: boolean; message: string; data: Book }>(`/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookData),
    });
  },

  async deleteBook(id: string) {
    return request<{ success: boolean; message: string }>(`/books/${id}`, {
      method: 'DELETE',
    });
  },

  // Borrow API
  async borrowBook(bookId: string, returnDate?: string) {
    return request<{ success: boolean; message: string; data: Borrow }>('/borrows', {
      method: 'POST',
      body: JSON.stringify({ bookId, returnDate }),
    });
  },

  async getMyBorrows() {
    return request<{ success: boolean; count: number; data: Borrow[] }>('/borrows');
  },

  async returnBook(borrowId: string) {
    return request<{ success: boolean; message: string }>(`/borrows/${borrowId}`, {
      method: 'DELETE',
    });
  },

  // Auth API
  async register(data: { name: string; email: string; photoUrl?: string; password: string }) {
    return request<{ success: boolean; message: string; userId: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: { email: string; password: string }) {
    return request<{ success: boolean; message: string; token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async googleAuth(data: { email: string; name: string; photoUrl?: string }) {
    return request<{ success: boolean; message: string; token: string; user: User }>('/auth/google', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getMe() {
    return request<{ success: boolean; user: User }>('/auth/me');
  }
};
