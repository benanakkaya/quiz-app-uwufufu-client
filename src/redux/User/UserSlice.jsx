import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginRequest = createAsyncThunk(
  "user/login",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://quiz-app-uwufufu-backend.herokuapp.com/user/login",
        values
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerRequest = createAsyncThunk(
  "user/register",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://quiz-app-uwufufu-backend.herokuapp.com/user/register",
        values
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserData = createAsyncThunk("user/getUserData", async (id) => {
  const res = await axios.post(
    "https://quiz-app-uwufufu-backend.herokuapp.com/user/getUserData",
    {
      id,
    }
  );
  return res.data;
});

const initialState = {
  isLoginned: false,
  loginnedUser: {},
  loginStatus: "idle",
  registerStatus: "idle",
  modalVisibility: false,
  modalForm: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginned: (state, action) => {
      state.isLoginned = action.payload;
      if (action.payload === false) {
        state.loginnedUser = {};
        state.loginStatus = "idle";
        localStorage.removeItem("token");
      }
    },
    setModalVisiblity: (state, action) => {
      state.modalVisibility = action.payload;
    },
    setModalForm: (state, action) => {
      state.modalForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginnedUser = action.payload.user;
        state.isLoginned = true;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.loginStatus = "failed";
      });
    builder
      .addCase(registerRequest.pending, (state, action) => {
        state.registerStatus = "loading";
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.loginStatus = "succeeded";
        state.isLoginned = true;
        state.loginnedUser = action.payload.user;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(registerRequest.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.error = action.payload.error;
      });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loginStatus = "succeeded";
      state.loginnedUser = action.payload;
      state.isLoginned = true;
    });
  },
});

export default userSlice.reducer;

export const { setLoginned, setModalVisiblity, setModalForm } =
  userSlice.actions;
