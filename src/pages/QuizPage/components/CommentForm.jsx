import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getQuiz } from "../../../redux/Quiz/QuizSlice";

const CommentForm = ({ quiz }) => {
  const { loginnedUser, isLoginned } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [author, setAuthor] = useState(null);
  const [comment, setComment] = useState({
    author: null,
    text: "",
    isAnonymous: false,
    quizID: null,
  });

  useEffect(() => {
    if (loginnedUser.username) {
      setComment((prev) => ({
        ...prev,
        author: loginnedUser._id,
      }));
      setAuthor(loginnedUser.username);
    }else{
      setAuthor("Anonymous");
    }

  }, [loginnedUser]);

  const handleAnonymous = (e) => {
    if (e.target.checked) {
      setAuthor("Anonymous");
      setComment((prev) => ({ ...prev, isAnonymous: true }));
    } else {
      setAuthor(loginnedUser.username);
      setComment((prev) => ({ ...prev, isAnonymous: false }));
    }
  };

  const handleSubmit = async () => {
    setComment((prev) => ({ ...prev, text: "" }));
    if (isLoginned) {
      if (!comment.text) {
        toast.error("Please write a comment");
      } else if (comment.text.length <= 8) {
        toast.error("Comment is too short");
      } else {
        const res = await axios
          .post(
            "https://quiz-app-backend-kn9w.onrender.com/comment/new-comment",
            {
              ...comment,
              quizID: quiz._id,
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            dispatch(getQuiz(quiz._id));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      toast.error("Please login first...");
    }
  };

  return (
    <div className="flex flex-col gap-3 text-white">
      <label className="flex flex-col gap-3 ">
        Nickname:
        <input
          value={author}
          disabled
          type="text"
          name="nickname"
          className="bg-customDark border-[2px] border-customGray px-2 py-1 rounded-lg cursor-not-allowed "
        />
        <label className="flex gap-2 text-xs">
          <input
            onChange={(e) => handleAnonymous(e)}
            type="checkbox"
            value="Anonymous"
            checked={isLoginned ? false : true }
            disabled={isLoginned ? false : true}
          />
          Anonymous
        </label>
      </label>
      <label className="flex flex-col gap-3 ">
        Speak your mind
        <textarea
          onChange={(e) =>
            setComment((prev) => ({ ...prev, text: e.target.value }))
          }
          
          value={comment.text}
          placeholder="Input your massage"
          className="bg-customDark border-[2px] border-customGray px-2 py-1 rounded-lg min-h-[150px] max-h-[250px] placeholder:italic "
        />
      </label>
      <button
        onClick={handleSubmit}
        className="py-2 bg-gradient-to-r from-yellow-300 to-yellow-600 font-bold rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default CommentForm;
