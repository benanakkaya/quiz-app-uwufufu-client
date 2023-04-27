import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import { fetchSearchedQuiz } from "../../redux/Quiz/QuizSlice";

const SearchPage = () => {
  const dispatch = useDispatch();

  const { quizList, quizListStatus } = useSelector((state) => state.quiz);

  const params = useParams();

  useEffect(() => {
    dispatch(fetchSearchedQuiz(params.searchIndex));
  }, [params.searchIndex]);

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
                <QuizCard quiz={quiz} />
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

export default SearchPage;
