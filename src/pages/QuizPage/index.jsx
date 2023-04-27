import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteQuiz,
  getQuiz,
  setPlayModalVisibility,
} from "../../redux/Quiz/QuizSlice";
import ChoiceList from "../EditQuiz/components/ChoiceList";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import PlayModal from "./components/PlayModal";

const QuizPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { quiz, playModalVisibility } = useSelector((state) => state.quiz);
  const { loginnedUser, isLoginned } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuiz(params.quizID)).then((res) => {
      if (res.type === "quiz/getQuiz/rejected") {
        toast.error(res.payload.message);
        navigate("/");
      }
    });
  }, [params.quizID]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete")) {
      dispatch(
        deleteQuiz({ user: loginnedUser._id, quizId: params.quizID })
      ).then((res) => {
        toast.success("Quiz deleted successfully");
        navigate("/my-quizzes");
      });
    }
  };

  return (
    <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-6 flex flex-col-reverse md:grid grid-cols-3 gap-10">
      <div className="col-span-2 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-white font-bold text-3xl">{quiz.title}</h1>
          <p className="text-white font-bold text-lg text-opacity-50 ">
            {quiz.description}
          </p>
        </div>
        <ChoiceList />
      </div>
      <div className="col-span-1 flex flex-col gap-4">
        {playModalVisibility && <PlayModal />}
        {quiz.published && (
          <button
            onClick={() => dispatch(setPlayModalVisibility(true))}
            className=" bg-gradient-to-r from-green-300 to-green-600 text-white font-bold w-full py-2 rounded-lg"
          >
            Play
          </button>
        )}
        {quiz.user?._id === loginnedUser._id && isLoginned && (
          <>
            <a
              href={`/edit/${quiz._id}`}
              className=" bg-gradient-to-r from-blue-300 to-blue-600 flex items-center justify-center text-white font-bold w-full py-2 rounded-lg"
            >
              Edit
            </a>
            <button
              onClick={() => handleDelete()}
              className=" bg-gradient-to-r from-red-300 to-customRed text-white font-bold w-full py-2 rounded-lg"
            >
              Delete
            </button>
          </>
        )}
        <div className="flex flex-col gap-4">
          <strong className="text-white text-lg font-bold">Comments:</strong>
          <CommentForm quiz={quiz} />
          <CommentList quiz={quiz} />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
