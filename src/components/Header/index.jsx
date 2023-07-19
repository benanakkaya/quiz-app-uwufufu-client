import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewQuiz } from "../../redux/Quiz/QuizSlice";
import {
  setLoginned,
  setModalForm,
  setModalVisiblity,
} from "../../redux/User/UserSlice";
import SearchBox from "./components/SearchBox";

const Header = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const dispatch = useDispatch();
  const { isLoginned, loginnedUser } = useSelector((state) => state.user);

  const [mobileMenuVisibility, setMobileMenuVisibility] = useState(false);

  const navigate = useNavigate();

  const handleSearchBox = () => {
    setSearchBoxVisibility(!searchBoxVisibility);
  };

  const handleModal = (form) => {
    dispatch(setModalForm(form));
    dispatch(setModalVisiblity(true));
  };

  const handleCreateQuiz = () => {
    dispatch(createNewQuiz(loginnedUser._id)).then((res) => {
      // toast.success(res.payload.message);
      navigate(`/edit/${res.payload.newQuiz._id}`);
    });
  };

  return (
    <div className="w-full bg-customDark border-b border-[1px] border-customGray  text-white relative">
      <div className="container px-6 sm:px-8 md:px-10 lg:px-12 py-6  flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-3xl text-customRed font-bold">
            MernQuiz
          </a>
          <div className="flex items-center gap-4">
            <ImSearch
              onClick={handleSearchBox}
              className="text-xl cursor-pointer"
            />
          </div>
        </div>
        <button onClick={() => setMobileMenuVisibility((prev) => !prev)}>
          <AiOutlineMenu className="cursor-pointer text-white text-2xl block md:hidden " />
        </button>
        <div className="hidden md:flex items-center gap-4">
          {isLoginned === false ? (
            <>
              <button
                onClick={() => {
                  handleModal("login");
                  setMobileMenuVisibility(false);
                }}
                className="bg-blue-600 px-2 py-1 rounded-md text-sm"
              >
                Login
              </button>
              <button
                onClick={() => {
                  handleModal("register");
                  setMobileMenuVisibility(false);
                }}
                className="bg-customRed px-2 py-1 rounded-md text-sm "
              >
                Register
              </button>
            </>
          ) : (
            <>
              <a
                onClick={() => setMobileMenuVisibility(false)}
                href="/my-quizzes"
                className="text-white px-2 py-1 text-sm rounded-lg bg-yellow-600"
              >
                My Quizzes
              </a>
              <button
                onClick={handleCreateQuiz}
                className="text-white px-2 py-1 text-sm rounded-lg bg-blue-600"
              >
                Create Quiz
              </button>
              <button
                onClick={() => {
                  dispatch(setLoginned(false));
                  setMobileMenuVisibility(false);
                }}
                className={
                  "text-white px-2 py-1 text-sm rounded-lg bg-customRed"
                }
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {searchBoxVisibility && (
        <SearchBox setSearchBoxVisibility={setSearchBoxVisibility} />
      )}
      {mobileMenuVisibility && (
        <div className="absolute border-y-[1px] border-y-customGray top-full w-full items-center justify-center bg-customLightDark z-50 flex md:hidden gap-4 px-6 sm:px-8 py-6">
          {isLoginned === false ? (
            <>
              <button
                onClick={() => {
                  handleModal("login");
                  setMobileMenuVisibility(false);
                }}
                className="bg-blue-600 px-2 py-1 rounded-md text-sm"
              >
                Login
              </button>
              <button
                onClick={() => {
                  handleModal("register");
                  setMobileMenuVisibility(false);
                }}
                className="bg-customRed px-2 py-1 rounded-md text-sm "
              >
                Register
              </button>
            </>
          ) : (
            <>
              <a
                onClick={() => setMobileMenuVisibility(false)}
                href="/my-quizzes"
                className="text-white px-2 py-1 text-sm rounded-lg bg-yellow-600"
              >
                My Quizzes
              </a>
              <button
                onClick={handleCreateQuiz}
                className="text-white px-2 py-1 text-sm rounded-lg bg-blue-600"
              >
                Create Quiz
              </button>
              <button
                onClick={() => {
                  dispatch(setLoginned(false));
                  setMobileMenuVisibility(false);
                }}
                className={
                  "text-white px-2 py-1 text-sm rounded-lg bg-customRed"
                }
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
