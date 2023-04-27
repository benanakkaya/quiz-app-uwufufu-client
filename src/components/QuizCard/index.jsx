import React from "react";
import { AiFillEdit } from "react-icons/ai";

const QuizCard = ({ quiz, userPage }) => {
  return (
    <a href={`/quiz/${quiz._id}`} className="group hover:scale-[1.05]">
      <div className="flex flex-col p-3 bg-customLightDark rounded-lg gap-2 border-customGray border-[2px] ">
        <div className="relative flex items-center justify-center">
          <img
            className="object-contain h-[180px]"
            src={
              quiz.coverImage
                ? quiz.coverImage
                : "https://sweatpantsandcoffee.com/wp-content/uploads/2019/09/quiz-featured-1.png"
            }
            alt={quiz.title}
          />
        </div>
        <strong className="text-white font-bold text-lg  group-hover:text-customRed">
          {quiz.title.length > 25
            ? quiz.title.slice(0, 25) + "..."
            : quiz.title
            ? quiz.title
            : "(No Title)"}
        </strong>
        {userPage && (
          <div className="flex items-center justify-between">
            {quiz.published ? (
              <span className="text-sm font-bold text-blue-600">
                #Published
              </span>
            ) : (
              <span className="text-sm font-bold text-yellow-600">
                #Unpublished
              </span>
            )}

            {/* <button className="z-20 flex items-center justify-center py-1 px-2">
            <AiFillEdit />
          </button> */}
          </div>
        )}
      </div>
    </a>
  );
};

export default QuizCard;
