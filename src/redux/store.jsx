import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./slices/greetingPageSlice.jsx";
import taskReducer from "./slices/tasksSlice.jsx";
import usersReducer from "./slices/usersSlice.jsx";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    tasksSlice: taskReducer,
    usersSlice: usersReducer,
  },
});
