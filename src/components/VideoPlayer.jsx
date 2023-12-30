import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import sample_video from "../assets/video/sample_video.mp4";
import play_btn from "../assets/images/svg/play-button-svgrepo-com.svg";
import pause_btn from '../assets/images/svg/pause-button-icon.svg';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseToggle = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <section>
        <div className="container">
          <Link to="/">
            <button className="common_btns my-4">Back</button>
          </Link>
          <div className="d-flex justify-content-center">
            <div className="position-relative d-inline-block">
              <video
                ref={videoRef}
                controls
                className="rounded-5"
                onPlay={handlePlay}
                onPause={handlePause}
              >
                <source src={sample_video} type="video/mp4" />
              </video>
              <img
                onClick={playPauseToggle}
                className={`play_pause_btn cursor_pointer ${isPlaying ? "opacity-0 pe-none" : ""}`}
                src={isPlaying ? pause_btn : play_btn}
                alt="play_btn"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoPlayer;
