import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChoiceList from "./ChoiceList";
import ChoiceType from "./ChoiceType";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

const Choices = () => {
  const { quiz } = useSelector((state) => state.quiz);

  //Oluşturulan choice bilgilerinin tutulduğu state
  const [choice, setChoice] = useState({
    title: "",
    url: "",
    choiceType: "image",
    quiz: quiz._id,
  });

  //Seçim tipi değiştiğinde "choice" stateini sıfırlıyoruz
  useEffect(() => {
    setChoice({ ...choice, title: "", url: "" });
  }, [choice.choiceType]);

  return (
    <div className="flex flex-col gap-3 py-6">
      <ChoiceType choice={choice} setChoice={setChoice} />
      {choice.choiceType === "image" ? (
        <ImageUpload choice={choice} setChoice={setChoice} />
      ) : (
        <VideoUpload choice={choice} setChoice={setChoice} />
      )}
      <ChoiceList editMode />
    </div>
  );
};

export default Choices;
