import React, { useState } from "react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
    const [toggle, setToggle] = useState(false);

    let linkWraperClass, link_title, icon_wraper;

    if (toggle === true) {
        linkWraperClass = "link-wraper md-link-wraper small_link-wraper";
        link_title = "link-title md-link-title small_link-title";
        icon_wraper = "icon-wraper small_icon-wraper";
    } else {
        linkWraperClass = "link-wraper";
        link_title = "link-title";
        icon_wraper = "icon-wraper";
    }

    return (
        <div
            className={`sidebar z-20 h-full  bg-black ${
                toggle ? "md-sidebar small_sidebar" : ""
            } `}
        >
            {/*----------- Menu Button -----------*/}

            <div className="links ">
                <div
                    className={`${
                        toggle
                            ? linkWraperClass
                            : "md:text-white md:flex md:items-center md:py-6 md:px-6"
                    } `}
                    onClick={() => setToggle(!toggle)}
                >
                    <div
                        className={`${
                            toggle
                                ? icon_wraper
                                : "text-white text-center mt-2 text-3xl md:text-6xl"
                        }`}
                    >
                        <i className="bx bxl-spotify logo"></i>
                    </div>

                    <h3 className="">
                        <span
                            className={`${
                                toggle
                                    ? link_title
                                    : "hidden text-3xl md:block md:text-4xl md:ml-2"
                            }`}
                        >
                            ShitiFy
                        </span>
                    </h3>
                </div>

                {/*-------------- Links --------------*/}

                <NavLink
                    to="/"
                    style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "aliceblue" : "",
                            color: isActive ? "#1b232e" : "",
                        };
                    }}
                    exact="true"
                    className={linkWraperClass}
                >
                    <div className={icon_wraper}>
                        <i className="bx bx-music"></i>
                    </div>
                    <h3 className={link_title}>Song's List</h3>
                </NavLink>

                <NavLink
                    to="/ProductForm"
                    exact="true"
                    style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "aliceblue" : "",
                            color: isActive ? "#1b232e" : "",
                        };
                    }}
                    className={linkWraperClass}
                >
                    <div className={icon_wraper}>
                        <i className="bx bx-list-plus"></i>
                    </div>
                    <h3 className={link_title}>Create New Playlist</h3>
                </NavLink>

                <NavLink
                    to="/ProductForm/:id"
                    style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "aliceblue" : "",
                            color: isActive ? "#1b232e" : "",
                        };
                    }}
                    className={linkWraperClass}
                >
                    <div className={icon_wraper}>
                        <i className="bx bx-heart"></i>
                    </div>
                    <h3 className={link_title}>Liked Songs</h3>
                </NavLink>
            </div>

            {/*----------- LogedIn User -----------*/}
        </div>
    );
};

export default Dashboard;
