import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsImage } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewChoice,
  editChoice,
  setChoiceModalVisiblity,
  setChoiceValues,
} from "../../../redux/Choice/ChoiceSlice";
import { getQuiz, uploadImage } from "../../../redux/Quiz/QuizSlice";
import ImagePreview from "./ImagePreview";

const ImageUpload = ({ choice, setChoice, editActive }) => {
  const [uploadType, setUploadType] = useState("url");
  const [validImage, setValidImage] = useState(true);

  const selectImage = useRef(null);
  const dispatch = useDispatch();

  const handleImageLoad = () => {
    setValidImage(true);
  };

  const handleImageError = () => {
    setValidImage(false);
  };

  //Local ve url'e göre seçim yapılınca title ve url bilgilerinin sıfırlayan fonksiyon
  const handleUploadType = (value) => {
    setUploadType(value);
    if (editActive) {
      dispatch(setChoiceValues({ ...choice, url: "" }));
    } else {
      setChoice({ ...choice, title: "", url: "" });
    }
  };

  const handleUpload = async () => {
    //Zaten bir url ise burada url olarak linki alıyoruz
    let url = choice.url;
    //Eğer url değilse seçilen local image'i cloudinary'e upload ediyoruz
    if (typeof choice.url !== "string") {
      url = await uploadImage(choice.url);
    }
    //Ardından oluşturulan seçimi veritabanına kaydediyoruz ve quiz bilgilerini güncelliyoruz.
    dispatch(addNewChoice({ ...choice, url })).then(() => {
      dispatch(getQuiz(choice.quiz));
      setChoice({ ...choice, title: "", url: "" });
      toast.success("Choice added successfully");
    });
  };

  const handleTitle = (values) => {
    if (editActive) {
      dispatch(setChoiceValues(values));
    } else {
      setChoice(values);
    }
  };

  const handleUrl = (values) => {
    if (editActive) {
      dispatch(setChoiceValues(values));
    } else {
      setChoice(values);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleUrl({ ...choice, url: acceptedFiles[0] });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleEdit = () => {
    dispatch(editChoice(choice)).then((res) => {
      dispatch(getQuiz(choice.quiz));
      dispatch(setChoiceModalVisiblity(false));
      toast.success("Choice updated successfully");
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-customLightDark p-4 rounded-lg">
      <strong className="text-lg text-white">Image Upload</strong>
      <input
        value={choice.title}
        onChange={(e) => handleTitle({ ...choice, title: e.target.value })}
        className="text-center text-white w-full py-2 rounded-lg bg-customDark border-customGray border-dashed border-[3px] outline-none"
        placeholder="Image Title (optional)"
        type="text"
        name="title"
      />
      <div className="flex flex-col gap-4 w-full ">
        <div className="w-full flex items-center justify-around ">
          <label htmlFor="url" className="flex items-center gap-5 text-white">
            <input
              checked={uploadType === "url"}
              onChange={(e) => handleUploadType(e.target.value)}
              type="radio"
              id="url"
              value="url"
            />
            URL
          </label>
          <label htmlFor="local" className="flex items-center gap-5 text-white">
            <input
              checked={uploadType === "local"}
              onChange={(e) => handleUploadType(e.target.value)}
              type="radio"
              id="local"
              value="local"
            />
            Local Image
          </label>
        </div>
        <div className="flex flex-col gap-5">
          {uploadType === "url" ? (
            <div>
              <input
                onChange={(e) =>
                  handleTitle({ ...choice, url: e.target.value })
                }
                className="text-center text-white w-full py-2 rounded-lg bg-customDark border-customGray border-dashed border-[3px] outline-none"
                placeholder="Image Url *"
                type="text"
                name="title"
                value={choice.url}
              />

              <div className="flex items-center justify-center p-4">
                <img
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  src={choice.url}
                  alt="url preview"
                  className={`${
                    validImage === false ? "hidden" : null
                  } max-h-[300px]`}
                />
              </div>
              {editActive === true ? (
                <button
                  onClick={handleEdit}
                  disabled={validImage === true ? false : true}
                  className="w-full py-2 text-white bg-gradient-to-r from-red-400 to-customRed rounded-lg p-4  "
                >
                  {validImage === false
                    ? "Please enter a valid image url"
                    : "Edit Choice"}
                </button>
              ) : (
                <button
                  onClick={handleUpload}
                  disabled={validImage === true ? false : true}
                  className="w-full py-2 text-white bg-gradient-to-r from-red-400 to-customRed rounded-lg p-4  "
                >
                  {validImage === false
                    ? "Please enter a valid image url"
                    : "Add Choice"}
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
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
                    handleUrl({ ...choice, url: e.target.files[0] })
                  }
                  ref={selectImage}
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
                {typeof choice.url === "string" ? (
                  <>
                    <strong className="text-lg text-customGray">
                      {" "}
                      DROP IMAGE FILE HERE OR CLICK UPLOAD
                    </strong>
                    <BsImage className="text-5xl text-customGray" />
                  </>
                ) : (
                  <ImagePreview image={choice.url} selectImage={selectImage} />
                )}
              </div>
              {editActive === true ? (
                <button
                  onClick={handleEdit}
                  disabled={typeof choice.url === "string" ? true : false}
                  className="w-full py-2 text-white bg-gradient-to-r from-red-400 to-customRed rounded-lg p-4  "
                >
                  {typeof choice.url === "string"
                    ? "Select a image"
                    : "Edit Choice"}
                </button>
              ) : (
                <button
                  onClick={handleUpload}
                  disabled={typeof choice.url === "string" ? true : false}
                  className="w-full py-2 text-white bg-gradient-to-r from-red-400 to-customRed rounded-lg p-4  "
                >
                  {typeof choice.url === "string"
                    ? "Select a image"
                    : "Add Choice"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
