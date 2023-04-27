import { useFormik } from "formik";
import React, { useState } from "react";
import { MdPerson2, MdEmail, MdKey } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  registerRequest,
  setModalForm,
  setModalVisiblity,
} from "../../../redux/User/UserSlice";
import FormInput from "./FormInput";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [registerStatus, setRegisterStatus] = useState("idle");

  const formInputs = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      icon: <MdPerson2 className="text-customRed bg-customLightDark" />,
    },
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
    {
      name: "password2",
      type: "password",
      placeholder: "Password (confirm)",
      icon: <MdKey className="text-customRed bg-customLightDark" />,
    },
  ];

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password2: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      setRegisterStatus("pending");
      dispatch(registerRequest(values)).then((res) => {
        if (res.type === "user/register/rejected") {
          toast.error(res.payload.message);
        } else {
          setRegisterStatus("ready");
          toast.success(res.payload.message);
          dispatch(setModalVisiblity(false));
        }
      });
    },
  });

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-customRed text-2xl font-bold">Register</h1>
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
            placeholder={input.placeholder}
            name={input.name}
            type={input.type}
          />
        ))}
        <button
          disabled={registerStatus === "pending" ? true : false}
          className="px-2 py-1 text-white bg-customRed rounded-md w-full"
          type="submit"
        >
          {registerStatus === "pending" ? (
            <span className="flex w-full justify-center items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin duration-500" />
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
      <div className="border-t-[1px] border-t-customGray py-3 w-full flex items-center justify-center gap-2 text-sm text-white">
        Have you already register?
        <button
          type="submit"
          onClick={() => dispatch(setModalForm("login"))}
          className="text-customRed"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
