import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Routers";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div>
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
