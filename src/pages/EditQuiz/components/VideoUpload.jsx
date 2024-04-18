import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewChoice,
  editChoice,
  setChoiceModalVisiblity,
  setChoiceValues,
} from "../../../redux/Choice/ChoiceSlice";
import { getQuiz } from "../../../redux/Quiz/QuizSlice";

const VideoUpload = ({ choice, setChoice, editActive }) => {
  const [videoId, setVideoId] = useState("");
  const [linkError, setLinkError] = useState(true);
  const dispatch = useDispatch();

  const fetchVideoInfo = async (id) => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyCasIjKIK6h64oQSqMCtMJ1OUFuFg3V-N4`
    );
    if (editActive) {
      dispatch(
        setChoiceValues({ ...choice, title: res.data.items[0].snippet.title })
      );
    } else {
      setChoice({ ...choice, title: res.data.items[0].snippet.title });
    }
  };

  async function extractVideoIdFromLink(link) {
    //Geçerli bir youtube linki olduğunu kontrol eden regex
    const youtubeRegex =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;

    //Eğer geçerli bir youtube linki değilse hata alıyoruz.
    if (!youtubeRegex.test(link)) {
      setLinkError(true);
    }
    else {
      const match = link.match(youtubeRegex);
      const videoId = match[1];
      fetchVideoInfo(videoId);
      setVideoId(videoId);
      setLinkError(false);
    }

  }

  const handleUpload = () => {
    dispatch(addNewChoice(choice)).then(() => {
      dispatch(getQuiz(choice.quiz));
      setChoice({ ...choice, title: "", url: "" });
      setVideoId("");
      setLinkError(true);
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

  const handleEdit = () => {
    dispatch(editChoice(choice)).then((res) => {
      dispatch(getQuiz(choice.quiz));
      dispatch(setChoiceModalVisiblity(false));
      toast.success("Choice updated successfully");
    });
  };

  useEffect(() => {
    if (choice.choiceType === "video" && choice.url) {
      extractVideoIdFromLink(choice.url);
    }
  }, [choice.url]);

  return (
    <div className="flex flex-col gap-4 bg-customLightDark p-4 rounded-lg">
      <strong className="text-lg text-white">Video Upload</strong>
      <input
        value={choice.url}
        onChange={(e) => handleUrl({ ...choice, url: e.target.value })}
        className="text-center text-white w-full py-2 rounded-lg bg-customDark border-customGray border-dashed border-[3px] outline-none"
        placeholder="Video Url*"
        type="text"
        name="video-url"
      />
      <input
        value={choice.title}
        onChange={(e) => handleTitle({ ...choice, title: e.target.value })}
        className="text-center text-white w-full py-2 rounded-lg bg-customDark border-customGray border-dashed border-[3px] outline-none"
        placeholder="Video Title (optional)"
        type="text"
        name="title"
      />
      <div className="flex w-full gap-4 items-center justify-around ">
        {!linkError && (
          <iframe
            className="w-64 sm:72 md:w-96"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
      {editActive === true ? (
        <button
          disabled={linkError === true ? true : false}
          onClick={handleEdit}
          className="w-full py-2 text-white bg-gradient-to-r from-red-400 to-customRed rounded-lg p-4  "
        >
          {linkError === true
            ? "Please enter valid youtube url"
            : "Edit Choice"}
        </button>
      ) : (
        <button
          disabled={linkError === true ? true : false}
          onClick={handleUpload}
          className="w-full py-2 text-white bg-gradient-to-r from-red-400 to-customRed rounded-lg p-4  "
        >
          {linkError === true ? "Please enter valid youtube url" : "Add Choice"}
        </button>
      )}
    </div>
  );
};

export default VideoUpload;
