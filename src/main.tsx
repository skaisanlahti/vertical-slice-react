import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProvider, Application } from "./application/Application.ts";
import { router } from "./application/router.tsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider value={new Application()}>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
