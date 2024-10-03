import { useState, useRef } from 'react';
import play from "../../assets/icons/play.svg"
import download from "../../assets/icons/downloading.svg"
import closeIcon from "../../assets/icons/close.svg"

const Player = ({recordTime, audioSrc}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    // time update
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    // start/stop
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // audio has downloaded, set durration 
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    // progress bar in %
    const progressPercent = (currentTime / duration) * 100;

    return(
        <div className="player">
            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            /> 
            <div className="playerTimer">
                {recordTime}
            </div>
            <div className="playerBtn" onClick={togglePlayPause}>
                <img src={play} alt="play" width="24" height="24" />
            </div>
            <div className="playerProgress">
                <div
                    className="playerProgressBar"
                    style={{
                        width: `${progressPercent}%`,
                    }}
                />
            </div>
            <div className="playerDownload">
                <img src={download} alt="play" width="24" height="24" />
            </div>
            <div className="playerDeleteBtn">
            <img src={closeIcon} alt="play" width="24" height="24" />
            </div>
        </div>
    )
}

export default Player