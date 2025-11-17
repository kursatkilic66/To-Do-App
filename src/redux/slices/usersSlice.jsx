import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/rest/api/users/";
//const AUTH_BASE_URL = "http://localhost:8080/auth/";
const AUTH_BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;
const PRODUCT_URL = import.meta.env.VITE_API_URL;
//const BASE_URL = `${PRODUCT_URL}/rest/api/users/`;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      return true;
    } catch (error) {
      return rejectWithValue(error.toString)();
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_BASE_URL}/login`, loginData);
      const token = response.data.token;
      localStorage.setItem("token", token);

      return response.data;
    } catch (error) {
      console.error("Giriş hatası:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMyAccount = createAsyncThunk(
  "users/deleteMyAccount",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().usersSlice;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.delete(`${USER_API_URL}/me`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeUserFromDatabase = createAsyncThunk(
  "users/changeUser",
  async (userData, userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}changeUser/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserTasksFromDatabase = createAsyncThunk(
  "users/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}getUser/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsersFromDatabase = createAsyncThunk(
  "users/getAllUsers",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}getAllUsers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    currentUser: null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || null,
    loading: "idle",
    error: null,
    users: [],
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.currentUser = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.users.push(action.payload);
    },
    setLoggedUserId: (state, action) => {
      state.loggedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = "succeeded";

        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.token = action.payload.token;
        state.currentUser = {
          id: action.payload.id,
          name: action.payload.name,
          surname: action.payload.surname,
          email: action.payload.email,
        };
        state.isLoggedIn = true;
        //localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.message;
        state.currentUser = null;
        state.token = null;
        state.isLoggedIn = false;
        //localStorage.removeItem("token");
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.currentUser = null;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = "succeeded";
      });
  },
});
export const { setUser, setLoggedUserId } = usersSlice.actions;
//export const { setUser, setLoggedUserId, logout } = usersSlice.actions;

export default usersSlice.reducer;
