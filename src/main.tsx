import React from "react";
import ReactDOM from "react-dom/client";
import IndexCards from "./pages/index_cards/index.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IndexCardContextProvider } from "./pages/index_cards/IndexCardsContext.tsx";
import Home from "./pages/home/Home.tsx";
import { DialogContextProvider } from "./shared/context/DialogContext.tsx";
import CountryList from "./pages/list/CountryList.tsx";
import { countries } from "./Countries.ts";

import './shared/configs/i18n.ts';

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
  }
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
