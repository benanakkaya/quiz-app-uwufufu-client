import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginned } from '../../../redux/User/UserSlice';

const MobileMenu = ({handleCreateQuiz,setMobileMenuVisibility,handleModal}) => {

    const dispatch = useDispatch();

    const {isLoginned} = useSelector(state => state.user)



  return (
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
  )
}

export default MobileMenu