import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { countries } from "./Countries.ts";
import "./index.css";
import Home from "./pages/home/Home.tsx";
import IndexCards from "./pages/index_cards/index.tsx";
import CountryList from "./pages/list/CountryList.tsx";
import { DialogContextProvider } from "./shared/context/DialogContext.tsx";

import "./shared/configs/i18n.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index-cards",
    element: <IndexCards />,
  },
  {
    path: "/list",
    element: <CountryList countries={countries} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DialogContextProvider>
      <RouterProvider router={router} />
    </DialogContextProvider>
  </React.StrictMode>
);
