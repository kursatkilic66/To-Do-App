import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  loading: "idle",
  error: null,
};
//const BASE_URL = "http://localhost:8080/rest/api/tasks/";

const PRODUCT_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${PRODUCT_URL}/rest/api/tasks/`;

export const getMyTasks = createAsyncThunk(
  "tasks/getUsersTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().usersSlice;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${BASE_URL}getUsersTasks`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addTaskToDatabase = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().usersSlice;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(taskData);
      const response = await axios.post(`${BASE_URL}addTask`, taskData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTaskFromDatabase = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().usersSlice;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${BASE_URL}deleteTask/${taskId}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeTaskFromDatabase = createAsyncThunk(
  "tasks/changeTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}changeTask/${taskData.id}`,
        taskData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleDoneTask = createAsyncThunk(
  "tasks/handleDoneTask",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().usersSlice;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${BASE_URL}handleDone/${taskId}`,
        null,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTaskFromDatabase = createAsyncThunk(
  "tasks/getTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}getTask/${taskId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTasksFromDatabase = createAsyncThunk(
  "tasks/getAllTasksFromDatabase",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}getAllTasks`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tasksSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task, index) => index !== action.payload
      );
    },
    changeTask: (state, action) => {
      const changedTask = action.payload;
      state.tasks.map((task, index) => {
        if (index === changedTask.index) {
          deleteTask(index);
          setTask(changedTask);
        }
        return state.tasks;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyTasks.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getMyTasks.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(getMyTasks.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(addTaskToDatabase.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addTaskToDatabase.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTaskToDatabase.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })

      .addCase(deleteTaskFromDatabase.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteTaskFromDatabase.fulfilled, (state, action) => {
        state.loading = "succeeded";

        const deletedTaskId = action.payload.id;
        const index = state.tasks.findIndex(
          (task) => task.id === deletedTaskId
        );
        if (index !== -1) {
          state.tasks.splice(index, 1);
        }
      })
      .addCase(deleteTaskFromDatabase.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(handleDoneTask.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(handleDoneTask.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      })
      .addCase(handleDoneTask.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const { setTask, deleteTask, changeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
