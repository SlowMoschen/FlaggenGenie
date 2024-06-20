import React from "react";
import ReactDOM from "react-dom/client";
import IndexCards from "./pages/index_cards/index.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IndexCardContextProvider } from "./pages/index_cards/IndexCardsContext.tsx";
import Home from "./pages/home/Home.tsx";
import { DialogContextProvider } from "./shared/context/DialogContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index-cards",
    element: <IndexCards />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IndexCardContextProvider>
      <DialogContextProvider>
        <RouterProvider router={router} />
      </DialogContextProvider>
    </IndexCardContextProvider>
  </React.StrictMode>
);
