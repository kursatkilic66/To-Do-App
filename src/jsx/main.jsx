import { createRoot } from "react-dom/client";
import "../css/index.css";
import "../css/GreetingPage.css";
import "../css/MainPage.css";
import { store } from "../redux/store.jsx";
import { Provider } from "react-redux";
import GreetingPage from "./GreetingPage.jsx";
import MainPage from "./MainPage.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LogoutButton from "./LogoutButton.jsx";
import App from "./App.jsx";
import React from "react";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <Routes>
          <LogoutButton></LogoutButton>
          <Route path="/" element={<GreetingPage />} />
          <Route path="/HomePage" element={<MainPage />} />
        </Routes> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
