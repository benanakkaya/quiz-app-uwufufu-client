import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNextChoices } from "../../redux/Choice/ChoiceSlice";

import VideoPlayer from "./components/VideoPlayer";

const PlayQuiz = () => {
  const { gameChoices, choice1, choice2, totalTour, currentTour, champ } =
    useSelector((state) => state.choice);
  const { quiz } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameChoices.length > 0) {
      dispatch(setNextChoices());
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6 px-6 sm:px-8 md:px-10 lg:px-12">
      <div className="flex items-center justify-center flex-col gap-3">
        <a className="text-3xl text-white " href={`/quiz/${quiz._id}`}>
          {quiz.title}
        </a>
        {champ ? (
          <span className="textxl text-customRed">CHAMPION</span>
        ) : totalTour === 1 && currentTour === 1 ? (
          <span className="textxl text-customRed">Final Round</span>
        ) : (
          <div className="text-xl text-white">
            <span className="text-customRed">{currentTour + " "}</span>/
            {" " + totalTour}
          </div>
        )}
      </div>
      {champ ? (
        <div className="w-full grid grid-cols-1 gap-8">
          <VideoPlayer choice={champ} />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <VideoPlayer choice={choice1} otherChoice={choice2} />
          <VideoPlayer choice={choice2} otherChoice={choice1} />
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
