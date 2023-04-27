import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import { getUserQuizzes } from "../../redux/Quiz/QuizSlice";

const MyQuizzes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizList, quizListStatus } = useSelector((state) => state.quiz);
  const { loginnedUser } = useSelector((state) => state.user);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      if (loginnedUser._id) dispatch(getUserQuizzes(loginnedUser._id));
    } else {
      navigate("/");
    }
  }, [loginnedUser]);

  return (
    <>
      {quizListStatus === "succeeded" ? (
        <>
          {quizList.length === 0 ? (
            <div className="flex items-center justify-center italic text-2xl  text-customRed py-10">
              No quizzes found to list
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-6 sm:px-8 md:px-10 lg:px-12 py-6">
              {quizList.map((quiz) => (
                <QuizCard key={quiz._id} userPage quiz={quiz} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center w-full min-h-screen">
          <AiOutlineLoading3Quarters className="text-5xl text-customRed animate-spin" />
        </div>
      )}
    </>
  );
};

export default MyQuizzes;
