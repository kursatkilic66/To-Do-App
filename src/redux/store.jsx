import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./slices/greetingPageSlice.jsx";
import taskReducer from "./slices/tasksSlice.jsx";
import usersReducer from "./slices/usersSlice.jsx";

function loadStateFromStorage() {
  try {
    const token = localStorage.getItem("token");
    if (token == null) {
      return undefined;
    }

    return {
      usersSlice: {
        token: token,
        isLoggedIn: true,
        currentUser: null,
        loading: "succeeded",
        error: null,
      },
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
