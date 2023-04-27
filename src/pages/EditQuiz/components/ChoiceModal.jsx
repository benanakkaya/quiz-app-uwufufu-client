import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setChoiceModalVisiblity,
  setChoiceValues,
} from "../../../redux/Choice/ChoiceSlice";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

const ChoiceModal = () => {
  const dispatch = useDispatch();

  const { choiceModalVisibility, choiceValues } = useSelector(
    (state) => state.choice
  );

  return (
    <div className="fixed flex w-full  text-red-500" style={{ zIndex: "2" }}>
      <div className="fixed inset-0 w-full h-full flex items-center justify-center transition-opacity">
        <div
          onClick={() => dispatch(setChoiceModalVisiblity(false))}
          className="absolute inset-0 bg-gray-600 opacity-75"
        ></div>
        <div className="bg-customDark rounded-lg shadow relative  p-3 m-3">
          <div className="flex items-center w-full justify-end  p-2">
            <AiOutlineCloseCircle
              onClick={() => dispatch(setChoiceModalVisiblity(false))}
              className="text-xl text-customRed cursor-pointer"
            />
          </div>
          {choiceValues.choiceType === "video" ? (
            <VideoUpload
              editActive
              choice={choiceValues}
              setChoice={setChoiceValues}
            />
          ) : (
            <ImageUpload
              editActive
              choice={choiceValues}
              setChoice={setChoiceValues}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoiceModal;
