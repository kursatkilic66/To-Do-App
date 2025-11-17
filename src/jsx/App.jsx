import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GreetingPage from "./GreetingPage";
import MainPage from "./MainPage";
import { useEffect } from "react";
import LogoutButton from "./LogoutButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe, getMeThunk } from "../redux/slices/usersSlice";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.usersSlice);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
function PublicRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.usersSlice);
  if (isLoggedIn) {
    return <Navigate to="/HomePage" replace />;
  }
  return children;
}

function App() {
  const dispatch = useDispatch();

  //   const dispatch = useDispatch;
  //   const { loading } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       // 2. HATA DÜZELTİLDİ: Yazım hatası (defaults)
  //       //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //       dispatch(getMe(token));
  //     }
  //   }, [dispatch]);

  //   const token = localStorage.getItem("token");
  //   if (loading === "loading" && token) {
  //     return <div>Yükleniyor...</div>; // Veya daha güzel bir loading spinner
  //   }
  useEffect(() => {
    dispatch(getMeThunk());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <GreetingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/HomePage"
        element={
          <PublicRoute>
            <MainPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;
