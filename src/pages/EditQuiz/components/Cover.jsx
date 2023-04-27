import React, { useCallback, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import ImagePreview from "./ImagePreview";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../../../redux/Quiz/QuizSlice";

const Cover = () => {
  const selectImage = useRef(null);
  const { quiz } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    dispatch(setQuiz({ ...quiz, coverImage: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex flex-col gap-4 bg-customLightDark p-4 rounded-lg">
        <strong className="text-lg text-white">Cover</strong>
        <div className="flex flex-col gap-4">
          <input
            value={quiz.title}
            onChange={(e) =>
              dispatch(
                setQuiz({
                  ...quiz, // Önceki state değerlerini yeni state'e kopyala
                  title: e.target.value, // Yalnızca değiştirmek istediğiniz değeri değiştir
                })
              )
            }
            className="text-center text-white w-full py-2 rounded-lg bg-customDark border-customGray border-dashed border-[3px] outline-none"
            placeholder="Input Title"
            type="text"
            name="title"
          />
          <textarea
            value={quiz.description}
            onChange={(e) =>
              dispatch(
                setQuiz({
                  ...quiz, // Önceki state değerlerini yeni state'e kopyala
                  description: e.target.value, // Yalnızca değiştirmek istediğiniz değeri değiştir
                })
              )
            }
            className="text-center h-32 min-h-[128px] max-h-32 text-white w-full py-2 rounded-lg bg-customDark border-customGray border-dashed border-[3px] outline-none"
            placeholder="Input Description"
            type="text"
            name="description"
          />
          <div
            {...getRootProps()}
            onClick={() => selectImage.current.click()}
            className={`relative p-2 hover:opacity-75 flex flex-col justify-center items-center gap-3 bg-customDark h-64 border-[3px] border-dashed ${
              isDragActive ? "border-customRed" : "border-customGray"
            } cursor-pointer rounded-lg`}
          >
            <input
              {...getInputProps()}
              onChange={(e) =>
                dispatch(
                  setQuiz({
                    ...quiz, // Önceki state değerlerini yeni state'e kopyala
                    coverImage: e.target.files[0], // Yalnızca değiştirmek istediğiniz değeri değiştir
                  })
                )
              }
              ref={selectImage}
              type="file"
              className="hidden"
              accept="image/*"
            />
            {!quiz.coverImage ? (
              <>
                <strong className="text-lg text-customGray">
                  {" "}
                  DROP IMAGE FILE HERE OR CLICK UPLOAD
                </strong>
                <BsImage className="text-5xl text-customGray" />
              </>
            ) : (
              <ImagePreview image={quiz.coverImage} selectImage={selectImage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
