# 🔗 URL Shortener — Frontend

A clean, modern **URL Shortener** web application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Zustand** for state management. Users can register, log in, shorten URLs, manage their link history, and get redirected instantly via short codes.

---

## 🚀 Live Demo

> **Frontend:** [https://your-app.vercel.app](https://your-app.vercel.app)
> **Backend API:** [https://your-backend.onrender.com](https://your-backend.onrender.com)

---

## 📁 Related Repository

- 🔧 **Backend:** [URL Shortener Backend](https://github.com/katkamsaiprem/URL)

---

## ✨ Features

- 🔐 **Authentication** — Register, Login, Logout with JWT (access + refresh tokens via HttpOnly cookies)
- 🔗 **Shorten URLs** — Create short links from any long URL
- 📋 **Dashboard** — View, copy, edit, and delete all your shortened URLs
- 🛡️ **Protected Routes** — Dashboard accessible only to authenticated users
- 🔄 **Session Restore** — Auto-restores session on page reload using refresh tokens
- 📱 **Responsive Design** — Fully mobile-friendly UI with Tailwind CSS v4

---

## 🛠️ Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| Framework        | React 19                            |
| Language         | TypeScript                          |
| Styling          | Tailwind CSS v4                     |
| State Management | Zustand                             |
| Routing          | React Router DOM v7                 |
| HTTP Client      | Axios                               |
| Build Tool       | Vite 8                              |
| Linting          | ESLint 10 + TypeScript ESLint       |
| Deployment       | Vercel                              |

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (ProtectedRoute, etc.)
├── hooks/            # Custom React hooks
├── pages/            # Route-level page components
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── services/         # Axios API service functions
├── store/            # Zustand global state stores
│   └── authStore.ts
├── types/            # TypeScript type definitions
├── utils/            # Helper / utility functions
├── App.tsx           # Root component with routing
└── main.tsx          # Application entry point
```

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A running instance of the [URL Shortener Backend](https://github.com/katkamsaiprem/URL)

### 1. Clone the Repository

```bash
git clone https://github.com/katkamsaiprem/URL_Shortener_Frontend.git
cd URL_Shortener_Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root by copying the example:

```bash
cp .env.example .env
```

Then update the values:

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:3000
```

> ⚠️ All Vite environment variables **must** be prefixed with `VITE_` to be accessible in the browser.

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 🔑 Environment Variables

| Variable            | Description                          | Example                                |
|---------------------|--------------------------------------|----------------------------------------|
| `VITE_API_BASE_URL` | Base URL of the backend REST API     | `http://localhost:3000`                |

See [`.env.example`](.env.example) for the full template.

---

## 📜 Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start the Vite dev server (hot-reload)   |
| `npm run build` | Compile TypeScript and bundle for prod   |
| `npm run preview` | Preview the production build locally  |
| `npm run lint`  | Run ESLint across the project            |

---

## 🖥️ Pages & Routes

| Route         | Component     | Auth Required |
|---------------|---------------|---------------|
| `/`           | Login         | ❌            |
| `/login`      | Login         | ❌            |
| `/register`   | Register      | ❌            |
| `/dashboard`  | Dashboard     | ✅            |

---

## 🚢 Deployment (Vercel)

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Add the `VITE_API_BASE_URL` environment variable pointing to your deployed backend.
4. Vercel automatically detects Vite — click **Deploy**.

The `vercel.json` in this repo configures SPA fallback routing so React Router works correctly on Vercel.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
