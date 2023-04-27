import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import quizReducer from "./Quiz/QuizSlice";
import choiceReducer from "./Choice/ChoiceSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
    choice: choiceReducer,
  },
});

export default store;
