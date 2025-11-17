import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./slices/greetingPageSlice.jsx";
import taskReducer from "./slices/tasksSlice.jsx";
import usersReducer from "./slices/usersSlice.jsx";

const usersInitialState = {
  currentUser: null,
  isLoggedIn: false,
  token: null,
  loading: "idle",
  error: null,
  users: [],
  loggedUserId: null, // Bu da muhtemelen eksikti
};

function loadStateFromStorage() {
  try {
    const token = localStorage.getItem("token");
    if (token == null) {
      return undefined;
    }

    return {
      usersSlice: {
        ...usersInitialState, // 👈 Önce tüm varsayılanları koy
        token: token, // 👈 Sonra token ile ilgili olanları ez
        isLoggedIn: true,
        loading: "succeeded",
      },
      // usersSlice: {
      //   token: token,
      //   isLoggedIn: true,
      //   currentUser: null,
      //   loading: "succeeded",
      //   error: null,
      //   users: [],
      // },
    };
  } catch (error) {
    return undefined;
  }
}

const preloadedState = loadStateFromStorage();

export const store = configureStore({
  reducer: {
    //auth: authReducer,
    toggle: toggleReducer,
    tasksSlice: taskReducer,
    usersSlice: usersReducer,
  },
  preloadedState: preloadedState,
});
