import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  const tracks = [
    "audio1.mp3",
    "audio2.mp3",
    "audio3.mp3",
    // Add more audio tracks as needed
  ];

  const playPauseToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    const seekTime = event.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const playNextTrack = () => {
    const nextIndex = (trackIndex + 1) % tracks.length;
    setTrackIndex(nextIndex);
    audioRef.current.src = tracks[nextIndex];
    audioRef.current.play();
    setIsPlaying(true);
  };

  const playPrevTrack = () => {
    const prevIndex = trackIndex === 0 ? tracks.length - 1 : trackIndex - 1;
    setTrackIndex(prevIndex);
    audioRef.current.src = tracks[prevIndex];
    audioRef.current.play();
    setIsPlaying(true);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div>
       <div className='container'><Link to='/'><button className='common_btns my-4'>Back</button></Link></div>
      <audio
        ref={audioRef}
        src={tracks[trackIndex]}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      ></audio>

      <div>
        <button onClick={playPrevTrack}>Previous</button>
        <button onClick={playPauseToggle}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={playNextTrack}>Next</button>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max={duration}
          step="1"
          value={currentTime}
          onChange={handleSeek}
        />
      </div>

      <div>
        <p>
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
