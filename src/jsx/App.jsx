import React from "react";
import { Routes, Route } from "react-router-dom";
import GreetingPage from "./GreetingPage";
import MainPage from "./MainPage";
import { useEffect } from "react";
import LogoutButton from "./LogoutButton";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      // 2. HATA DÜZELTİLDİ: Yazım hatası (defaults)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Token yoksa (gerekirse bir şey yap)
    }
  }, []);

  return (
    <MainPage />
    // <Routes>
    //   <Route path="/" element={<GreetingPage />} />
    //   <Route path="/HomePage" element={<MainPage />} />
    // </Routes>
  );
}

export default App;
