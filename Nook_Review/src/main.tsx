import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Main_Page from "./main_page.tsx";
import Appbar from "./appbar.tsx";
import Islands from "./islands.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route index element={<Main_Page />} />
        <Route path="/islands" element={<Islands />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
