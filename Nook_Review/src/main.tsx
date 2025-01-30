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
import Signup from "./signup.tsx";
import UserIslandPage from "./usersIsland.tsx";
import RegisterIsland from "./registerIsland.tsx";
import UserPage from "./userPage.tsx";
import ResetPasswordForm from "./components/resetPassword.tsx";

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
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/:username/" element={<UserPage />}>
              <Route path="island" element={<UserIslandPage />} />
              <Route path="register-island" element={<RegisterIsland />} />
            </Route>
            <Route
              path="/login/forgot-password"
              element={<ResetPasswordForm />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
