import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { playlistContext } from "../../playlistContext";
import { signOut, auth } from "../../utility/config";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user } = useContext(playlistContext);

    const languages = [
        {
            lang: "hindi",
            title: "Hindi  Playlist",
            image: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb19af0ea736c6228d6eb539c/1/en/default",
            activeSongIndex: 0,
        },
        {
            lang: "eng",
            title: "English  Playlist",
            image: "https://i.scdn.co/image/ab67616d00001e02df9a35baaa98675256b35177",
            activeSongIndex: 0,
        },
    ];
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return navigate("/login");
        }
    }, [user]);

    const SignOutHandler = () => {
        signOut(auth)
            .then((res) => {
                // Sign-out successful.
                alert("Sign-out successful.", res);
                localStorage.removeItem("user");
                localStorage.setItem("isAuthenticated", false);
                navigate("/login");
            })
            .catch((error) => {
                alert(error);
            });
    };
    console.log(user);

    let Links = languages.map((link) => (
        <Link to={`/playlist/${link.lang}`}>
            <div className="bg-gray-800 hover:bg-gray-700 cursor-pointer relative w-max p-3 rounded mr-5 card">
                <div className="w-48 h-4/5 relative shadow-md">
                    <img
                        className=" mx-auto"
                        src={link.image}
                        alt={link.lang}
                    />
                </div>

                <div className="mt-4 ">
                    <h1 className="font-bold">{link.title}</h1>
                </div>
            </div>
        </Link>
    ));

    return (
        <div className="relative bg-secondary text-white overflow-auto w-full">
            <div className="relative flex items-center bg-black w-max ml-auto mt-4 mr-4 border-gray-300 border rounded-3xl group">
                <div className="w-8 rounded-full overflow-hidden border">
                    <img src={user && user.photoURL} alt="img" />
                </div>
                <h3 className="font-semibold text-sm mx-3">
                    {user && user.displayName}
                </h3>
                <button
                    onClick={SignOutHandler}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-semibold text-sm text-green-500 group-hover:block hidden w-full p-4 h-4"
                >
                    Sign out
                </button>
            </div>
            <div className="main-container">
                <div className=" mt-16 flex">{Links}</div>
            </div>
        </div>
    );
};

export default Home;
