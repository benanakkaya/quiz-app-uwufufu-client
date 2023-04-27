import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import QuizCard from "../../components/QuizCard";
import { getAllQuizzes } from "../../redux/Quiz/QuizSlice";

const Homepage = () => {
  const dispatch = useDispatch();

  const { quizList, quizListStatus } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getAllQuizzes());
  }, []);

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
                <QuizCard key={quiz._id} quiz={quiz} />
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

export default Homepage;
