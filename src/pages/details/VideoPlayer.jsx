import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ show, setShow, videoId, setVideoId }) => {
  // const VideoPopup = () => {};
  return (
    <>
      {videoId ?
      <div
        className={`${
          show ? "active" : ""
        } fixed md:w-3/4 lg:w-2/4 w-4/4 opacity-0 pointer-events-none video_player z-50`}
      >
        <div className="videoPlayer w-100 h-100">
          <span
            className="absolute -right-6 -top-6"
            onClick={() => {
              setShow(false);
              setVideoId(null);
            }}
          >
            <i className="uil uil-times text-3xl cursor-pointer"></i>
          </span>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            // playing={true}
          />
        </div>
      </div>
      : ""}
    </>
  );
};

export default VideoPlayer;
