import React from "react";

const FormInput = ({ icon, name, placeholder, type, formik }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="bg-customLightDark border-b-[1px] border-b-customRed flex gap-2 items-center px-2 py-1 rounded-t-md">
        {icon}
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="bg-customLightDark  autofill:focus:bg-customLightDark outline-none text-white"
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <small className="text-sm text-customRed">{formik.errors[name]}</small>
      )}
    </div>
  );
};

export default FormInput;
