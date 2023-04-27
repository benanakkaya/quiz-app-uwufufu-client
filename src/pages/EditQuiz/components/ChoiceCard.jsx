import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteChoice,
  setChoiceModalVisiblity,
  setChoiceValues,
} from "../../../redux/Choice/ChoiceSlice";
import { getQuiz } from "../../../redux/Quiz/QuizSlice";

const ChoiceCard = ({
  choice,
  index,
  activeVideo,
  setActiveVideo,
  editActive,
}) => {
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoId, setVideoId] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const dispatch = useDispatch();

  const fetchVideoInfo = async (id) => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyCasIjKIK6h64oQSqMCtMJ1OUFuFg3V-N4`
    );
    setVideoThumbnail(res.data.items[0].snippet.thumbnails.standard.url);
  };

  useEffect(() => {
    if (choice.choiceType === "video") {
      const youtubeRegex =
        /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
      const match = choice.url.match(youtubeRegex);
      const videoId = match[1];
      setVideoId(videoId);
      fetchVideoInfo(videoId);
    }
  });

  const handleShowVideo = () => {
    if (showVideo === false) {
      setActiveVideo(videoId);
    }
    if (choice.choiceType === "video") {
      setShowVideo((prev) => !prev);
    }
  };

  const handleDeleteChoice = () => {
    dispatch(deleteChoice({ choiceId: choice._id, quizId: choice.quiz })).then(
      (res) => {
        dispatch(getQuiz(choice.quiz));
        toast.success("Successfully deleted");
      }
    );
  };

  const handleChoice = () => {
    dispatch(setChoiceModalVisiblity(true));
    dispatch(setChoiceValues(choice));
  };

  useEffect(() => {
    if (activeVideo !== videoId) setShowVideo(false);
  }, [activeVideo]);

  return (
    <div className="flex flex-col gap-5 md:grid grid-cols-11 p-5 md:gap-10 border-b-[2px] border-customLightGray">
      <div className="col-span-6 flex flex-col md:grid grid-cols-6 gap-5 md:gap-10">
        <span className=" col-span-1 bg-customGray text-white w-[36px] h-[36px] rounded-full font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <div className="col-span-5 flex items-center justify-center">
          <img
            onClick={handleShowVideo}
            className={`max-h-[360px] ${
              choice.choiceType === "video" ? "cursor-pointer" : null
            }`}
            src={choice.choiceType === "video" ? videoThumbnail : choice.url}
            alt="imgss"
          />
        </div>
      </div>
      <div className="col-span-5 flex flex-col gap-4 flex-1 ">
        <div className="w-full py-2 border-b-[1px] border-customLightGray text-white font-bold flex items-center justify-between ">
          {choice.title ? (
            choice.title
          ) : (
            <span className="text-white text-opacity-50">No Title</span>
          )}
          <span
            className={`text-xs ${
              choice.choiceType === "video"
                ? "text-orange-400"
                : "text-green-400"
            }`}
          >
            #{choice.choiceType}
          </span>
        </div>
        {editActive && (
          <div className="flex items-center gap-4">
            <div className="h-[32px] w-[32px] rounded-full bg-customGray flex items-center justify-center cursor-pointer">
              <MdEdit onClick={handleChoice} className="text-white" />
            </div>
            <div className="h-[32px] w-[32px] rounded-full bg-white flex items-center justify-center cursor-pointer ">
              <BsTrash
                onClick={handleDeleteChoice}
                className="text-customGray"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 text-customLightGray ">
          <span>Championship Rate:</span>
          <progress
            title="Win rate in the quiz participated"
            value={choice.champ}
            max={choice.totalQuiz}
            className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-customGray [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-blue-400"
          />
          <span className="text-white font-bold">
            {choice.totalQuiz === 0
              ? "0"
              : ((choice.champ / choice.totalQuiz) * 100).toFixed(2)}
            %
          </span>
        </div>
        <div className="flex flex-col gap-2 text-customLightGray ">
          <span>1 vs 1 Win Rate:</span>
          <progress
            value={choice.win}
            max={choice.totalMatch}
            className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-customGray [&::-webkit-progress-value]:bg-red-400 [&::-moz-progress-bar]:bg-red-400"
          />
          <span className="text-white font-bold">
            {choice.totalMatch === 0
              ? "0"
              : ((choice.win / choice.totalMatch) * 100).toFixed(2)}
            %
          </span>
        </div>
      </div>
      {choice.choiceType === "video" && showVideo && (
        <div className="col-span-11 flex items-center justify-center">
          <iframe
            className="aspect-video h-auto w-full"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay: clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChoiceCard;
