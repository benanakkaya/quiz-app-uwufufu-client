import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const initialState = {
  quiz: { title: "", description: "" },
  status: "idle",
  quizList: [],
  quizListStatus: "idle",
  playModalVisibility: false,
};

export const createNewQuiz = createAsyncThunk(
  "quiz/createNewQuiz",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://quiz-app-backend-kn9w.onrender.com/quiz/new-quiz",
        {
          user,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllQuizzes = createAsyncThunk(
  "quiz/get-all-quizzes",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://quiz-app-backend-kn9w.onrender.com/quiz/get-all-quizzes"
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSearchedQuiz = createAsyncThunk(
  "quiz/fetch-searched-quiz",
  async (index, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://quiz-app-backend-kn9w.onrender.com/quiz/search-quiz",
        {
          index,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserQuizzes = createAsyncThunk(
  "quiz/get-user-quizzes",
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://quiz-app-backend-kn9w.onrender.com/quiz/get-user-quizzes",
        { userID: id }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://quiz-app-backend-kn9w.onrender.com/quiz/delete-quiz",
        values
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getQuiz = createAsyncThunk(
  "quiz/getQuiz",
  async (quizID, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://quiz-app-backend-kn9w.onrender.com/quiz/get-quiz`,
        {
          quizID,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getEditQuiz = createAsyncThunk(
  "quiz/getEditQuiz",
  async (quizID, thunkAPI) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token === null) {
      return thunkAPI.rejectWithValue("Please login first");
    }
    const decodedToken = jwt_decode(token);
    try {
      const res = await axios.post(
        `https://quiz-app-backend-kn9w.onrender.com/quiz/get-edit-quiz`,
        {
          quizID,
          userID: decodedToken._id,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "lhdtso3x");
  const res = await axios.post("https://api.cloudinary.com/v1_1/dmsj8hghq/image/upload", formData);
  return res.data.secure_url;
};

export const updateQuiz = createAsyncThunk(
  "quiz/updateQuiz",
  async (values, thunkAPI) => {
    try {
      console.log(values.coverImage);
      if (typeof values.coverImage !== "string" || !values.coverImage) {
        const coverImage = await uploadImage(values.coverImage);
        values = { ...values, coverImage };
      }
      console.log(values,"ahavalue")
      const res = await axios.post(
        "https://quiz-app-backend-kn9w.onrender.com/quiz/update-quiz",
        values
      );
      return res.data;
    } catch (error) {
      console.log("hata var gulum")
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setPlayModalVisibility: (state, action) => {
      state.playModalVisibility = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuiz.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quiz = action.payload;
      });
    builder
      .addCase(getEditQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEditQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quiz = action.payload;
      });
    builder
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quiz = action.payload.quiz;
      })
      .addCase(updateQuiz.pending, (state, action) => {
        state.status = "loading";
      });
    builder
      .addCase(getAllQuizzes.pending, (state, action) => {
        state.quizListStatus = "pending";
      })
      .addCase(getAllQuizzes.fulfilled, (state, action) => {
        state.quizListStatus = "succeeded";
        state.quizList = action.payload;
      });
    builder
      .addCase(getUserQuizzes.pending, (state, action) => {
        state.quizListStatus = "pending";
      })
      .addCase(getUserQuizzes.fulfilled, (state, action) => {
        state.quizListStatus = "succeeded";
        state.quizList = action.payload;
      });
    builder
      .addCase(fetchSearchedQuiz.pending, (state, action) => {
        state.quizListStatus = "pending";
      })
      .addCase(fetchSearchedQuiz.fulfilled, (state, action) => {
        state.quizListStatus = "succeeded";
        state.quizList = action.payload;
      });
  },
});

export default quizSlice.reducer;
export const { setQuiz, setPlayModalVisibility } = quizSlice.actions;
