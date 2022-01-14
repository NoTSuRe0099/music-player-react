import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext,
} from "react";
import { playlistContext } from "../../playlistContext";
import "./player.css";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef();
    const progress_bar = useRef();
    const [duration, setDuration] = useState(0);
    const [loop, setLoop] = useState(false);
    const [marginLeft, setMarginLeft] = useState(0);
    const [volumeStatus, setVolumeStatus] = useState("bx bx-volume-low");
    const [vol, setVol] = useState(0.1);
    const {
        currentSong,
        currentSongIndex,
        setCurrentSongIndex,
        Data,
        handleLikedSong,
    } = useContext(playlistContext);

    const onAudioLoad = (e) => {
        setPercentage(0);
        setDuration(e.currentTarget.duration.toFixed(2));
    };

    //? Volume Controll
    useEffect(() => {
        const audio = audioRef.current;
        if (+vol === 0) {
            audio.volume = 0;
        }

        let volPerc = Math.trunc(vol * 100);
        if (volPerc === 0) {
            setVolumeStatus("bx bx-volume-mute");
        } else if (volPerc > 0 && volPerc < 20) {
            setVolumeStatus("bx bx-volume");
        } else if (volPerc > 10 && volPerc < 60) {
            setVolumeStatus("bx bx-volume-low");
        } else {
            setVolumeStatus("bx bx-volume-full");
        }
    }, [vol]);

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = +vol;
    }, [vol]);

    const volumeControl = (event) => {
        // let volPercent = Math.trunc(+event.target.value * 100);
        setVol(event.target.value);
        const audio = audioRef.current;
        audio.volume = event.target.value;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const nextSong = useCallback(() => {
        if (currentSongIndex >= Data.length - 1) {
            setCurrentSongIndex(Data.length - 1);
        } else {
            setCurrentSongIndex(currentSong.index + 1);
        }
        const audio = audioRef.current;
        audio.autoplay = true;
        setIsPlaying(true);
    });

    //? ---------- Auto Play -------------

    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying) {
            if (audio.duration) {
                if (currentTime === duration) {
                    nextSong();
                }
            }
        }
    }, [currentTime, duration, isPlaying, nextSong]);

    const previousSong = () => {
        if (currentSongIndex === 0) {
            setCurrentSongIndex(0);
        } else {
            setCurrentSongIndex(currentSong.index - 1);
        }
        const audio = audioRef.current;
        audio.autoplay = true;
        setIsPlaying(true);
    };

    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const play = useCallback(() => {
        setIsPlaying(!isPlaying);
        const audio = audioRef.current;
        audio.volume = +vol;
        if (!isPlaying) {
            audio.play();
        }

        if (isPlaying) {
            audio.pause();
        }
    });

    const getCurrDuration = (e) => {
        const percent = (
            (e.currentTarget.currentTime / e.currentTarget.duration) *
            100
        ).toFixed(2);
        const time = e.currentTarget.currentTime;
        setPercentage(+percent);
        setCurrentTime(time.toFixed(2));
    };

    const sliderValue = (e) => {
        const audio = audioRef.current;
        if (audio.currentTime) {
            audio.currentTime = (audio.duration / 100) * e.target.value;
        }
        setPercentage(e.target.value);
    };

    useEffect(() => {
        const thumbWidth = 12;
        const centerThumb = (thumbWidth / 100) * percentage * -1;
        setMarginLeft(centerThumb);
    }, [percentage]);

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = loop;
    }, [loop]);

    const toggleLoop = () => {
        setLoop(!loop);
    };

    //* Key Handler for Play/Pause
    useEffect(() => {
        function handleKeyDown(e) {
            // console.log(e.keyCode);
            if (e.keyCode === 32) {
                play();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [play]);

    return (
        <div className="player w-full bg-primary absolute bottom-0 right-0 z-50 flex flex-col justify-center ">
            <span className=" h-px w-full bg-gray-500 absolute top-0"></span>
            <div className="flex items-center justify-between mx-4">
                <div className="w-1/3 flex items-center ">
                    <div className="w-14">
                        <img
                            src={
                                currentSong.data
                                    ? currentSong.data.image
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0oxE8xF7tEirlo_5eZcK7z25aZtg91fmzxmYC7bYzgBbN-x-2OeZQld9cRFNwzwOzr4E&usqp=CAU"
                            }
                            alt="fafwaf"
                        />
                    </div>

                    <span className="mx-4 w-max">
                        <h2 className="text-sm text-gray-100 font-semibold truncate w-48 lg:w-max ">
                            {currentSong.data ? currentSong.data.name : null}
                        </h2>
                        <div className="flex">
                            <h2 className="text-xs text-gray-400 font-semibold">
                                {currentSong.data
                                    ? currentSong.data.artist
                                    : null}
                            </h2>
                        </div>
                    </span>

                    <button
                        onClick={() => handleLikedSong(currentSongIndex)}
                        className="text-white text-lg "
                    >
                        {currentSong.data ? (
                            currentSong.data.isSaved ? (
                                <i className="bx bxs-heart text-red-500 like-btn"></i>
                            ) : (
                                <i className="bx bx-heart  like-btn"></i>
                            )
                        ) : null}
                    </button>
                </div>

                <div className="w-2/5">
                    <div className="flex w-full justify-center items-center -mb-2">
                        <button className="text-md m-2 text-gray-500">
                            <i className="bx bx-shuffle"></i>
                        </button>
                        <button
                            onClick={previousSong}
                            className="text-2xl text-gray-300 hover:text-gray-400 m-3"
                        >
                            <i className="bx bx-skip-previous"></i>
                        </button>

                        <button
                            className="w-8 h-8 play-btn hover:bg-gray-300 rounded-full bg-gray-100 flex justify-center items-center pointer outline-none"
                            onClick={() => play()}
                        >
                            {isPlaying ? (
                                <i className="bx bx-pause text-3xl"></i>
                            ) : (
                                <i className="bx bx-play text-3xl ml-1"></i>
                            )}
                        </button>

                        <button
                            onClick={nextSong}
                            className="text-2xl text-gray-300 hover:text-gray-400 m-3"
                        >
                            <i className="bx bx-skip-next"></i>
                        </button>
                        <button
                            onClick={toggleLoop}
                            className={`${
                                loop ? "text-gray-200" : "text-gray-500"
                            } 'text-lg'  m-2 `}
                        >
                            <i className="bx bx-repeat"></i>
                        </button>
                    </div>

                    <div className="flex items-center">
                        <h3 className="text-gray-100 text-xs m-2">
                            {fancyTimeFormat(currentTime)}
                        </h3>

                        <div className="w-full relative flex items-center bg-gray-300 progress-bar-wraper ">
                            <div
                                ref={progress_bar}
                                style={{
                                    width: `${percentage}%`,
                                }}
                                className=" progress-bar-div z-10 relative"
                            ></div>
                            <span
                                style={{
                                    left: `${percentage}%`,
                                    marginLeft: `${marginLeft}px`,
                                }}
                                className="thumb absolute"
                            ></span>
                            <input
                                type="range"
                                className="w-full progress-bar absolute opacity-0 z-50"
                                min="0"
                                max="100"
                                step="0.01"
                                onChange={(e) => sliderValue(e)}
                                value={percentage}
                            />
                        </div>

                        <h3 className="text-gray-100 text-xs m-2">
                            {fancyTimeFormat(duration)}
                        </h3>

                        <audio
                            ref={audioRef}
                            onTimeUpdate={getCurrDuration}
                            onLoadedData={(e) => onAudioLoad(e)}
                            src={
                                currentSong.data
                                    ? currentSong.data.songUrl
                                    : null
                            }
                        />
                    </div>
                </div>

                <div className="flex w-1/3 justify-end items-center">
                    <i className="bx bxs-playlist text-lg mr-3 text-gray-200 cursor-pointer"></i>
                    <i
                        onClick={() => setVol(0)}
                        className={`${volumeStatus} text-lg mr-3 text-gray-200 cursor-pointer`}
                    ></i>

                    <div className="audio relative w-max h-max flex volume-controller-wraper bg-gray-300 ">
                        <div
                            ref={progress_bar}
                            style={{
                                width: `${vol * 100}%`,
                            }}
                            className="volume-bar-div z-10 "
                        ></div>
                        <span
                            style={{
                                left: `${vol * 100}%`,
                                marginLeft: `${marginLeft}px`,
                            }}
                            className="thumb absolute z-20"
                        ></span>

                        <input
                            type="range"
                            min="0.0"
                            max="1.0"
                            step="0.01"
                            value={vol}
                            className="cursor-pointer opacity-0 z-50"
                            onChange={(event) => volumeControl(event)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
