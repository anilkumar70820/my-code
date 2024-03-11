import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import CommonButton from "../common/CommonButton";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const songs = [
    // Add your audio file URLs here
    "",
    "https://example.com/song2.mp3",
    // Add more songs if needed
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = (e) => {
    // You can perform actions as the time of the audio updates
    // For example, updating a progress bar
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Update progress bar or perform other actions
  };

  const songEndHandler = () => {
    // Triggered when the current song ends
    // You can implement logic to play the next song in the playlist
    // For simplicity, we'll just loop back to the first song in this example
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  return (
    <div className="py-5">
      <div className="container">
        <Link to="/">
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong}
      ></audio>
      <div>
        <h2>Now Playing</h2>
        <p>{currentSong}</p>
      </div>
      <div>
        <button onClick={playPauseHandler}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
