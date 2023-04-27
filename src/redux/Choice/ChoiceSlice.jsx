import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set } from "mongoose";

export const addNewChoice = createAsyncThunk(
  "choice/new-choice",
  async (values) => {
    const res = await axios.post(
      "https://quiz-app-uwufufu-backend.herokuapp.com/choice/new-choice",
      values
    );
    return res.data;
  }
);

export const deleteChoice = createAsyncThunk(
  "choice/delete-choice",
  async (values) => {
    const res = await axios.post(
      `https://quiz-app-uwufufu-backend.herokuapp.com/choice/delete-choice`,
      values
    );
    return res.data;
  }
);

export const editChoice = createAsyncThunk(
  "choice/edit-choice",
  async (values) => {
    const res = await axios.post(
      `https://quiz-app-uwufufu-backend.herokuapp.com/choice/edit-choice`,
      values
    );
    return res.data;
  }
);

export const getGameChoices = createAsyncThunk(
  "choice/get-game-choices",
  async (values) => {
    const res = await axios.post(
      "https://quiz-app-uwufufu-backend.herokuapp.com/choice/get-game-choices",
      values
    );
    return res.data;
  }
);

export const setWinningChoice = async (id) => {
  const res = await axios.post(
    "https://quiz-app-uwufufu-backend.herokuapp.com/choice/winning-choice",
    {
      id,
    }
  );
  return res.data;
};
export const setLosingChoice = async (id) => {
  const res = await axios.post(
    "https://quiz-app-uwufufu-backend.herokuapp.com/choice/losing-choice",
    {
      id,
    }
  );
  return res.data;
};
export const setChampChoice = async (id) => {
  const res = await axios.post(
    "https://quiz-app-uwufufu-backend.herokuapp.com/choice/champ-choice",
    {
      id,
    }
  );
  return res.data;
};

const initialState = {
  choiceModalVisibility: false,
  choiceValues: {},
  gameStatus: "idle",
  gameChoices: [],
  winnerChoices: [],
  choice1: {},
  choice2: {},
  totalTour: null,
  currentTour: null,
  champ: null,
};

const choiceSlice = createSlice({
  name: "choice",
  initialState,
  reducers: {
    setChoiceModalVisiblity: (state, action) => {
      state.choiceModalVisibility = action.payload;
    },
    setChoiceValues: (state, action) => {
      state.choiceValues = action.payload;
    },
    setWinnerChoices: (state, action) => {
      state.winnerChoices = [...state.winnerChoices, action.payload];
    },
    setGameChoices: (state, action) => {
      state.gameChoices = action.payload;
    },
    setNextChoices: (state, action) => {
      if (!state.totalTour) state.totalTour = state.gameChoices.length / 2;
      let choices = state.gameChoices;
      if (choices.length === 0 && action.payload.length >= 2) {
        choices = action.payload;
        for (let i = choices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [choices[i], choices[j]] = [choices[j], choices[i]];
        }
        state.totalTour = choices.length / 2;
        state.winnerChoices = [];
      }
      state.choice1 = choices[choices.length - 1];
      state.choice2 = choices[choices.length - 2];
      choices = choices.slice(0, -2);
      state.currentTour = state.totalTour - choices.length / 2;
      state.gameChoices = choices;
    },
    setChamp: (state, action) => {
      state.champ = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGameChoices.fulfilled, (state, action) => {
      state.gameChoices = action.payload;
      state.gameStatus = "ready";
    });
  },
});

export default choiceSlice.reducer;

export const {
  setChoiceModalVisiblity,
  setChoiceValues,
  setWinnerChoices,
  setGameChoices,
  setNextChoices,
  setChamp,
} = choiceSlice.actions;
