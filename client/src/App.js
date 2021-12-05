import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicList from "./Pages/MusicListComponent/MusicList";
import Dashboard from "./layout/DashboardComponent/Dashboard";
import MusicPlayer from "./layout/PlayerComponent/MusicPlayer";
import { Data } from "./Data";

const App = () => {
    console.log(Data);
    return (
        <Router>
            <Dashboard />
            <Routes>
                <Route path="/" exact element={<MusicList />} />
            </Routes>
            <MusicPlayer />
        </Router>
    );
};

export default App;
