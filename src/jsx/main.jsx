import { createRoot } from "react-dom/client";
import "../css/index.css";
import "../css/GreetingPage.css";
import "../css/MainPage.css";
import { store } from "../redux/store.jsx";
import { Provider } from "react-redux";
import GreetingPage from "./GreetingPage.jsx";
import MainPage from "./MainPage.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MainPage></MainPage>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GreetingPage />} />
        <Route path="/HomePage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
