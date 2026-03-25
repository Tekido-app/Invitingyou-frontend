import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options
          duration: 4000,
          style: {
            background: "#FFFFFF",
            color: "#1a1a1a",
            border: "1px solid #ccc8B9",
            borderRadius: "4px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
          // Success toast
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#a49b84", // cream-dark
              secondary: "#FFFFFF",
            },
          },
          // Error toast
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#1a1a1a", // black
              secondary: "#FFFFFF",
            },
          },
          // Loading toast
          loading: {
            iconTheme: {
              primary: "#ccc8B9", // cream
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
