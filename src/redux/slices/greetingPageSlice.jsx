import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginToggle: false,
  registerToggle: false,
};

export const greetingPageSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    loginToggleValue: (state) => {
      state.loginToggle = !state.loginToggle;
      console.log(state.loginToggle);
    },
    registerToggleValue: (state) => {
      state.registerToggle = !state.registerToggle;
      console.log(state.registerToggle);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginToggleValue, registerToggleValue } =
  greetingPageSlice.actions;

export default greetingPageSlice.reducer;
