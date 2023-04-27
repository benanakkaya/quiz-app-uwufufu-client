import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisiblity } from "../../redux/User/UserSlice";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const Modal = () => {
  const { modalVisibility, modalForm } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      {modalVisibility && (
        <div
          className="fixed flex w-full items-center justify-center h-screen"
          style={{ zIndex: "2" }}
        >
          <div className="fixed inset-0 transition-opacity">
            <div
              onClick={() => dispatch(setModalVisiblity(false))}
              className="absolute inset-0 bg-gray-600 opacity-75"
            ></div>
          </div>
          <div className="bg-customDark rounded-lg shadow relative w-80 md:w-96 p-3">
            <div className="flex items-center w-full justify-end  p-2">
              <AiOutlineCloseCircle
                onClick={() => dispatch(setModalVisiblity(false))}
                className="text-xl text-customRed cursor-pointer"
              />
            </div>
            {modalForm === "register" ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
