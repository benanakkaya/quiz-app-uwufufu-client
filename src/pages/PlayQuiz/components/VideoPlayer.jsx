import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import {
  setChamp,
  setChampChoice,
  setLosingChoice,
  setNextChoices,
  setWinnerChoices,
  setWinningChoice,
} from "../../../redux/Choice/ChoiceSlice";

const VideoPlayer = ({ choice, otherChoice }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [videoID, setVideoID] = useState(null);
  const dispatch = useDispatch();

  const { winnerChoices, totalTour, currentTour } = useSelector(
    (state) => state.choice
  );

  function extractVideoIdFromLink(link) {
    //Geçerli bir youtube linki olduğunu kontrol eden regex
    const youtubeRegex =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
    const match = link.match(youtubeRegex);
    const videoId = match[1];
    setVideoID(videoId);
  }

  useEffect(() => {
    if (choice.url && choice.choiceType === "video") {
      extractVideoIdFromLink(choice.url);
    }
  }, [choice]);

  const handleReadyVideo = (e) => {
    e.target.mute();
    setPlayer(e.target);
  };

  const onMouseOverVideo = () => {
    player.unMute();
  };

  const onMouseLeaveVideo = () => {
    // mouse video üzerindeyken mute prop'unu true olarak ayarlayın
    player.mute();
  };

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const handleChoose = async () => {
    if (totalTour === 1 && currentTour === 1) {
      setChampChoice(choice);
      dispatch(setChamp(choice));
      setWinningChoice(choice);
      setLosingChoice(otherChoice);
    } else {
      setWinningChoice(choice);
      setLosingChoice(otherChoice);
      dispatch(setWinnerChoices(choice));
      dispatch(setNextChoices([...winnerChoices, choice]));
    }
  };

  return (
    <div
      onMouseOver={choice.choiceType === "video" ? onMouseOverVideo : null}
      onMouseLeave={choice.choiceType === "video" ? onMouseLeaveVideo : null}
      className="col-span-1 overflow-hidden relative flex flex-col items-center justify-between w-full gap-4 "
    >
      {choice.choiceType === "video" ? (
        <div className="video-container relative  w-full flex items-center justify-center">
          {videoID && (
            <YouTube
              onReady={handleReadyVideo}
              ref={playerRef}
              videoId={videoID}
              opts={opts}
            />
          )}
        </div>
      ) : (
        <img className=" h-72" src={choice.url} alt={choice.title} />
      )}
      {choice.title && (
        <span className="absolute bottom-32 text-white font-bold text-2xl w-full flex items-center justify-center bg-customGray bg-opacity-30 py-1">
          {choice.title}
        </span>
      )}
      {otherChoice && (
        <button
          onClick={() => handleChoose()}
          className="text-customGray hover:text-customRed font-bold py-2 w-full border-[2px] border-customGray hover:border-customRed rounded-lg"
        >
          Choose
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
