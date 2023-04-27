import React, { useState } from "react";
import { MdEmail, MdKey } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  loginRequest,
  setModalForm,
  setModalVisiblity,
} from "../../../redux/User/UserSlice";
import FormInput from "./FormInput";
import ModalHeader from "./ModalHeader";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [loginStatus, setLoginStatus] = useState("idle");

  const formInputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: <MdEmail className="text-customRed bg-customLightDark" />,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: <MdKey className="text-customRed bg-customLightDark" />,
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoginStatus("pending");
      dispatch(loginRequest(values)).then((res) => {
        if (res.type === "user/login/rejected") {
          setLoginStatus("ready");
          toast.error(res.payload.message);
        } else {
          toast.success(res.payload.message);
          dispatch(setModalVisiblity(false));
        }
      });
    },
  });

  return (
    <div className="flex flex-col gap-3 items-center">
      <ModalHeader title="Login" />
      <form
        method="post"
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-4 py-3"
      >
        {formInputs.map((input) => (
          <FormInput
            formik={formik}
            key={input.name}
            icon={input.icon}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
          />
        ))}
        <button
          disabled={loginStatus === "pending" ? true : false}
          className="px-2 py-1 text-white bg-customRed rounded-md w-full"
          type="submit"
        >
          {loginStatus === "pending" ? (
            <span className="flex w-full justify-center items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin duration-500" />
              Logging on...
            </span>
          ) : (
            "Create one"
          )}
        </button>
      </form>
      <div className="border-t-[1px] border-t-customGray py-3 w-full flex items-center justify-center gap-2 text-sm text-white">
        Don't have an account?
        <button
          type="submit"
          onClick={() => dispatch(setModalForm("register"))}
          className="text-customRed"
        >
          Create one
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
