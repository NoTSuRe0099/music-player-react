import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicList from "./Pages/MusicListComponent/MusicList";
import Dashboard from "./layout/DashboardComponent/Dashboard";
import MusicPlayer from "./layout/PlayerComponent/MusicPlayer";
// import { Data as initialData } from "./Data";
import { playlistContext } from "./playlistContext";
import Home from "./Pages/Home/Home";
import Authentication from "./Pages/Authentication/Authentication";

const App = () => {
    const [currentSong, setCurrentSong] = useState({});
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [Data, setData] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);
    console.log();
    // useEffect(() => {
    //     const halow = [...Data];
    //     for (let i = 0; i < halow.length; i++) {
    //         if (i !== currentSongIndex) {
    //             halow[i].isPlaying = false;
    //         } else {
    //             halow[currentSongIndex].isPlaying = true;
    //         }
    //     }
    //     setData(halow);
    // }, [currentSongIndex]);

    useEffect(() => {
        setCurrentSong({
            index: currentSongIndex,
            data: Data[currentSongIndex],
        });
    }, [Data, currentSongIndex]);

    const handleLikedSong = (index) => {
        let newData = [...Data];
        newData[index].isSaved = !newData[index].isSaved;
        setData(newData);
    };

    useEffect(() => {
        let savedSongs = Data.filter((data) => data.isSaved === true);
        setLikedSongs(savedSongs);
    }, [Data]);

    return (
        <>
            <Router>
                <playlistContext.Provider
                    value={{
                        user,
                        isAuthenticated,
                        Data,
                        likedSongs,
                        currentSong,
                        currentSongIndex,
                        setCurrentSong,
                        setData,
                        setCurrentSongIndex,
                        handleLikedSong,
                        setIsAuthenticated,
                        setUser,
                    }}
                >
                    <Dashboard />
                    <Routes>
                        <Route
                            path={`/playlist/:lang`}
                            exact
                            element={<MusicList />}
                        />

                        <Route
                            path="/login"
                            exact
                            element={<Authentication />}
                        />

                        <Route path="/" exact element={<Home />} />
                    </Routes>
                    <MusicPlayer />
                </playlistContext.Provider>
            </Router>
        </>
    );
};

export default App;
