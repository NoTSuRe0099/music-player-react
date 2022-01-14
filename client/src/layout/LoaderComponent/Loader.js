import React from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="w-screen h-screen bg-primary">
            <div className="gooey">
                <span className="dot"></span>
                <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
