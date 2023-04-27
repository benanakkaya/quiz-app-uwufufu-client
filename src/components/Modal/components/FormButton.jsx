import React from "react";

const FormButton = ({ name }) => {
  return (
    <button
      disabled={registerStatus === "pending" ? true : false}
      className="px-2 py-1 text-white bg-customRed rounded-md w-full"
      type="submit"
    >
      {registerStatus === "pending" ? (
        <span className="flex items-center gap-2">
          <AiOutlineLoading3Quarters className="animate-spin duration-500" />
          Logging on...
        </span>
      ) : (
        "Create one"
      )}
    </button>
  );
};

export default FormButton;
