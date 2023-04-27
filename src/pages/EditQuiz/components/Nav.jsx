import React from "react";

const Nav = ({ activeStep, setActiveStep }) => {
  return (
    <nav className="flex items-center justify-between border-b-[1px] h-16 border-b-customGray">
      <div
        onClick={() => setActiveStep(1)}
        className={`cursor-pointer text-white text-lg ${
          activeStep === 1 && "border-b-customRed border-b-[1px]"
        }  h-full px-2 custom-pointer flex items-center justify-center`}
      >
        Cover
      </div>
      <div
        onClick={() => setActiveStep(2)}
        className={`cursor-pointer text-white text-lg ${
          activeStep === 2 && "border-b-customRed border-b-[1px]"
        }  h-full px-2 custom-pointer flex items-center justify-center`}
      >
        Choices
      </div>
      <div
        onClick={() => setActiveStep(3)}
        className={`cursor-pointer text-white text-lg ${
          activeStep === 3 && "border-b-customRed border-b-[1px]"
        }  h-full px-2 custom-pointer flex items-center justify-center`}
      >
        Publishing
      </div>
    </nav>
  );
};

export default Nav;
