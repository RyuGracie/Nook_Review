import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Main_Page from "./main_page.tsx";
import Appbar from "./appbar.tsx";
import Islands from "./islands.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IslandPage from "./islandPage.tsx";
import Login from "./login.tsx";
import { AuthProvider } from "./components/authContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Appbar />
          <Routes>
            <Route index element={<Main_Page />} />
            <Route path="/islands" element={<Islands />} />
            <Route path="/island/:islandName" element={<IslandPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
