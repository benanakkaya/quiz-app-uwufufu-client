import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGameChoices } from "../../../redux/Choice/ChoiceSlice";
import { setPlayModalVisibility } from "../../../redux/Quiz/QuizSlice";

const PlayModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quizItemCount, setQuizItemCount] = useState(2);

  const { quiz } = useSelector((state) => state.quiz);

  const handleStart = () => {
    dispatch(
      getGameChoices({
        quizID: quiz._id,
        quizType: quizItemCount,
      })
    ).then((res) => {
      navigate(`/quiz/${quiz._id}/play/${quizItemCount}`);
    });
  };

  const options = [
    {
      value: 2,
      label: "1 on 1",
    },
    {
      value: 4,
      label: "Final Four",
    },
    {
      value: 8,
      label: "Elite Eight",
    },
    {
      value: 16,
      label: "Sweet Sixteen",
    },
    {
      value: 32,
      label: "Round of 32",
    },
    {
      value: 64,
      label: "Round of 64",
    },
    {
      value: 128,
      label: "Round of 128",
    },
  ];

  return (
    <div className="fixed flex w-full text-red-500" style={{ zIndex: "2" }}>
      <div className="fixed inset-0 w-full h-full flex items-center justify-center transition-opacity">
        <div
          onClick={() => dispatch(setPlayModalVisibility(false))}
          className="absolute inset-0 bg-gray-600 opacity-75"
        ></div>
        <div className="bg-customDark rounded-lg shadow relative w-[600px] p-3 m-3">
          <div className="flex items-center w-full justify-end  p-2">
            <AiOutlineCloseCircle
              onClick={() => dispatch(setPlayModalVisibility(false))}
              className="text-xl text-customRed cursor-pointer"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-xl text-white font-bold">{quiz.title}</h1>
            <p className="text-sm text-white text-opacity-50">
              {quiz.description}
            </p>
            <img
              src={
                quiz.coverImage
                  ? quiz.coverImage
                  : "https://sweatpantsandcoffee.com/wp-content/uploads/2019/09/quiz-featured-1.png"
              }
              alt={quiz.title}
              className="w-48"
            />
            <select
              onChange={(e) => setQuizItemCount(Number(e.target.value))}
              value={quizItemCount}
              className="bg-customDark text-customRed py-2 border-b-[2px] border-b-customRed w-full outline-none rounded-lg text-lg"
            >
              {options
                .filter((option) => option.value <= quiz.choices.length)
                .map((option) => (
                  <option
                    className="bg-customGray hover:bg-customGray"
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
            </select>
            <button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-red-300 to-customRed py-2 text-white font-bold rounded-lg"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayModal;
