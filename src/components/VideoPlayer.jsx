import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import sample_video from '../assets/video/sample_video.mp4'

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
  
    const playPauseToggle = () => {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
  
    const handleVolumeChange = (value) => {
      setVolume(value);
      videoRef.current.volume = value;
    };
  
    const handlePrev = () => {
      // Implement logic for going to the previous video
      console.log("Previous video");
    };
  
    const handleNext = () => {
      // Implement logic for going to the next video
      console.log("Next video");
    };
  return (
    <>
    <section>
        <div className="container">
        <Link to='/'><button className='common_btns my-4'>Back</button></Link>
        <div className="video-player-container">
      <video ref={videoRef} className="video-player">
        <source
          src={sample_video}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="controls">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={playPauseToggle}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleNext}>Next</button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
      </div>
    </div>
        </div>
    </section>
    </>
  )
}

export default VideoPlayer
