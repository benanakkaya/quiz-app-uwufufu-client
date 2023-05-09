import React, { useState } from "react";
import moment from "moment";
import { BsTrash3Fill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getQuiz } from "../../../redux/Quiz/QuizSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CommentList = ({ quiz }) => {
  const dispatch = useDispatch();

  const { loginnedUser, isLoginned } = useSelector((state) => state.user);

  const [commentVisibility, setCommentVisibility] = useState(false);

  const handleDelete = async (id) => {
    const res = await axios
      .post(
        "https://quiz-app-backend-kn9w.onrender.com/comment/delete-comment",
        {
          id,
          quizID: quiz._id,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getQuiz(quiz._id));
      });
  };

  return (
    <>
      {quiz.comments?.length >= 1 && (
        <div className="flex flex-col gap-4 ">
          <button
            onClick={() => setCommentVisibility((prev) => !prev)}
            className="text-white text-start font-bold"
          >
            {commentVisibility
              ? "Hide Comments"
              : ` Show Comments (${quiz.comments?.length})`}
          </button>
          {commentVisibility && (
            <div className="flex flex-col gap-2">
              {quiz.comments
                ?.slice()
                .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
                .map((comment) => (
                  <div
                    key={comment._id}
                    className="flex flex-col gap-1 rounded-md"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-xs text-customRed">
                        {comment.isAnonymous
                          ? "Anonymous"
                          : comment.author.username}
                        <span className="text-white text-opacity-50 text-xs">
                          {moment(comment.createdAt).fromNow()}
                        </span>
                      </div>
                      {comment.author._id === loginnedUser._id &&
                        isLoginned && (
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="text-customRed"
                          >
                            <BsTrash3Fill />
                          </button>
                        )}
                    </div>
                    <p className="text-white">{comment.text}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CommentList;
