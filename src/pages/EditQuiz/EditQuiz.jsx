import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEditQuiz, updateQuiz } from "../../redux/Quiz/QuizSlice";

import Choices from "./components/Choices";
import Cover from "./components/Cover";

const EditQuiz = () => {
  const [activeStep, setActiveStep] = useState(1);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quiz } = useSelector((state) => state.quiz);
  const { loginnedUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getEditQuiz(params.quizID)).then((res) => {
      if (res.type === "quiz/getEditQuiz/rejected") {
        toast.error(res.payload.message);
        navigate("/");
      }
    });
  }, [params.quizID]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      navigate("/");
    }
  }, [loginnedUser]);

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (quiz.title.length <= 0) {
        toast.error("Please enter a title for the next step");
      } else if (quiz.title.length < 5) {
        toast.error("Title is too short, minimum length is 5");
      } else {
        dispatch(updateQuiz({ ...quiz, published: quiz.published })).then(
          (res) => toast("Cover is updated successfully")
        );
        setActiveStep((prev) => prev + 1);
      }
    } else if (activeStep === 2) {
      if (quiz.choices.length < 2) {
        toast.error("Please add minimum 2 choice");
      } else {
        dispatch(updateQuiz({ ...quiz, published: true })).then((res) => {
          toast("Quiz published successfully");
          navigate("/");
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 px-5 sm:px-10 md:px-15 lg:px-20 py-5 md:py-10">
      {/* <Nav activeStep={activeStep} setActiveStep={setActiveStep} /> */}
      {activeStep === 1 ? <Cover /> : activeStep === 2 ? <Choices /> : null}
      <div
        className={`flex items-center ${
          activeStep === 1 ? "justify-end" : "justify-between"
        }`}
      >
        {activeStep === 2 && (
          <button
            onClick={() => setActiveStep((prev) => prev - 1)}
            className=" bg-blue-600 text-white px-2 py-1 rounded-lg"
          >
            Back to cover
          </button>
        )}
        <button
          onClick={() => handleNextStep()}
          className="bg-customRed text-white px-2 py-1 rounded-lg"
        >
          {activeStep === 2 ? "Publish Quiz" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default EditQuiz;
