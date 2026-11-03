# 📚 BookNook – A Small Online Library

Welcome to **BookNook**, a modern, responsive, full-stack digital library application where book lovers can discover, borrow, return, and curate inspiring literature. Built on a simple yet timeless philosophy: **"Add a book, borrow a book, return a book."**

## 🌐 Live Website & Links
- **Live Website URL**: [https://booknook-library.vercel.app](https://booknook-library.vercel.app)
- **Client GitHub Repository**: [https://github.com/julkar929/booknook-clients](https://github.com/julkar929/booknook-clients)
- **Server GitHub Repository**: [https://github.com/julkar929/booknook-servers](https://github.com/julkar929/booknook-servers)

---

## 🌟 Key Features (Minimum 5 Highlights)
- **Dynamic Swiper.js Hero Banner**: Features an interactive multi-slide banner showcasing featured collections, frictionless lending, and community contributions with direct navigation to the full catalog.
- **Real-Time Dynamic New Arrivals**: Automatically queries and showcases the latest 6 titles sorted by newest addition with instant cover previews, authors, categories, and direct details navigation.
- **Full Library CRUD & Curator Dashboard**: Logged-in curators can contribute new titles (`/add-book`), update existing records with pre-filled forms (`/my-books`), and securely delete books with custom confirmation dialogues.
- **Smart Concurrency & Inventory Tracking ($inc)**: Employs atomic MongoDB `$inc` decrement on borrow and increment on return, dynamically disabling out-of-stock items with clear "Not Available" status indicators.
- **No Double Borrow Guard**: Automatically validates active borrowings to prevent a user from borrowing the same book title multiple times simultaneously.
- **Seamless JWT & BetterAuth Integration**: Secure credential and Google social login with protected route guards, persistent token rehydration, and zero redirection upon page reload.
- **Responsive Aesthetics with Theme Toggle**: Tailored with Tailwind CSS and Lucide icons, offering smooth Dark/Light mode switching, custom non-native modals, and interactive reader review sections.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Slider**: Swiper.js
- **Animations**: Framer Motion
- **Toasts & Feedback**: React Hot Toast
- **Authentication**: BetterAuth & JWT Token Integration
- **Backend**: Express.js REST API with MongoDB & atomic operators

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18.0 or later)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/booknook-client.git
cd booknook-client

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=booknook_better_auth_secret_key_2026
NEXT_PUBLIC_IMGBB_API_KEY=
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore BookNook!

---

## 📖 Navigation & Routes
| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Homepage featuring Swiper slider, New Arrivals, and community sections |
| `/books` | Public | All books grid with category filter and real-time search |
| `/books/:id` | Private | Comprehensive book details with borrow modal |
| `/add-book` | Private | Form to contribute new books with ImgBB upload and copy counts |
| `/my-books` | Private | Curator dashboard to edit or delete contributed titles |
| `/my-borrows` | Private | Active borrowings tracker with one-click return capability |
| `/login` | Public | User authentication with Google social login option |
| `/register` | Public | User registration with strict password validation |
| `/*` | Public | Custom 404 "Lost in the Stacks" page |

---

## 📄 License
This project is licensed under the MIT License.
