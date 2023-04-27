import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChoiceCard from "./ChoiceCard";
import ChoiceModal from "./ChoiceModal";
import Pagination from "./Pagination";

const ChoiceList = ({ editMode }) => {
  const { quiz } = useSelector((state) => state.quiz);
  const { choiceModalVisibility } = useSelector((state) => state.choice);

  const choicePerPage = 10;
  const totalPage = Math.ceil(quiz.choices?.length / 10);
  const [activePage, setActivePage] = useState(1);
  const firstItem = 1 + (activePage - 1) * choicePerPage;
  const lastItem = activePage * choicePerPage;

  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="flex flex-col gap-4 bg-customLightDark p-4 rounded-lg">
      {choiceModalVisibility && <ChoiceModal />}
      <strong className="text-lg text-white">Saved Choices</strong>
      {quiz.choices?.length === 0 ? (
        <span className="w-full flex flex-col items-center justify-center text-customGray text-3xl font-bold">
          Choice list is empty
        </span>
      ) : (
        <div className="flex flex-col gap-8">
          {quiz.choices
            ?.slice()
            .sort((a, b) => {
              if (a.champ / a.totalQuiz !== b.champ / b.totalQuiz) {
                return a.champ / a.totalQuiz > b.champ / b.totalQuiz ? -1 : 1;
              } else {
                return a.win / a.totalMatch > b.win / b.totalMatch ? -1 : 1;
              }
            })
            .map(
              (choice, ind) =>
                ind >= firstItem - 1 &&
                ind <= lastItem - 1 && (
                  <ChoiceCard
                    key={choice._id}
                    editActive={editMode}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                    choice={choice}
                    index={ind}
                  />
                )
            )}
          <Pagination
            totalPage={totalPage}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </div>
  );
};

export default ChoiceList;
