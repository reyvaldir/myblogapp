import React from "react";
import ReactDOM from "react-dom/client";
// Impor App.tsx Anda
import App from "./App.tsx";

// Impor yang diperlukan dari React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Impor file CSS utama Anda (di mana styling ShadCN berada)
import "./index.css";

// --- 1. Inisialisasi Query Client ---
// Instance ini mengelola caching dan data seluruh aplikasi
const queryClient = new QueryClient();

// Pastikan elemen 'root' ada
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 2. Sediakan QueryClientProvider ke seluruh aplikasi */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
