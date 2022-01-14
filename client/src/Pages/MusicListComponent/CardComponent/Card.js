import React, { useContext, useEffect } from "react";
import { playlistContext } from "../../../playlistContext";
import "../list.css";

const Card = (props) => {
    const { songNumber, song } = props;
    const { setCurrentSong, handleLikedSong, currentSong } =
        useContext(playlistContext);

    useEffect(() => {
        return () => {
            setCurrentSong({});
        };
    }, [setCurrentSong]);
    const currentId = currentSong.data ? currentSong.data.id : null;

    return (
        <>
            <div
                className={`${
                    song._id === currentId ? "bg-gray-400" : ""
                } group navigation hover:bg-gray-500 rounded-sm p-1 `}
            >
                {song._id === currentId ? (
                    <button
                        // onClick={() => setCurrentSongIndex(songNumber - 1)}
                        onClick={() =>
                            setCurrentSong({
                                index: songNumber - 1,
                                data: song,
                            })
                        }
                        className="relative w-8 h-8"
                    >
                        <i className="bx bx-pause text-2xl opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></i>
                    </button>
                ) : (
                    <button
                        // onClick={() => setCurrentSongIndex(songNumber - 1)}
                        onClick={() =>
                            setCurrentSong({
                                index: songNumber - 1,
                                data: song,
                            })
                        }
                        className="relative w-8 h-8"
                    >
                        <span className="mx-auto text-md text-gray-300 opacity-100 group-hover:opacity-0 absolute top-1/2 left-1/2 transform        -translate-y-1/2 -translate-x-1/2">
                            {songNumber}
                        </span>
                        <i className="bx bx-play text-2xl ml-1 opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></i>
                    </button>
                )}

                <div className="flex items-center">
                    <div className="w-10 relative mr-4">
                        <img
                            className="h-full w-full object-cover"
                            src={song.image}
                            alt={song.name}
                        />
                    </div>
                    <div>
                        <span className="font-semibold text-md">
                            {song.name}
                        </span>
                        <br />
                        <span className="text-sm text-gray-300 group-hover:text-gray-100">
                            {song.artist}
                        </span>
                    </div>
                </div>
                <div className="text-sm text-gray-300">
                    {(song.name + " ", song.artist)}
                </div>
                <div className="text-sm text-gray-300">15-12-2021</div>

                <div className="flex items-center ">
                    <button
                        onClick={() => handleLikedSong(songNumber - 1)}
                        className="opacity-0 group-hover:opacity-90 text-lg"
                    >
                        {song.isSaved ? (
                            <i className="bx bxs-heart text-red-500 like-btn"></i>
                        ) : (
                            <i className="bx bx-heart like-btn"></i>
                        )}
                    </button>
                    <div className="mx-auto text-sm text-gray-300 ">
                        {song.duration}
                    </div>
                    <button className="opacity-0 group-hover:opacity-90 text-lg font-semibold tracking-widest mb-3 card-more-optn">
                        ...
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card;
