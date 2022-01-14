import React, { useState, useEffect, useContext } from "react";
import { playlistContext } from "../../playlistContext";
import { useNavigate } from "react-router-dom";
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "../../utility/config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import GoogleButton from "react-google-button";

const Authentication = () => {
    const { isAuthenticated, setIsAuthenticated, setUser } =
        useContext(playlistContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, setSignIn] = useState(false);
    const [error, setError] = useState("");
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkUserAuth = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                setSignIn(true);
                console.log(user, "loggenin");
                navigate("/");
            } else {
                setIsAuthenticated(false);
                // navigate("/login");
                console.log("not Auth");
            }
        });
    };

    useEffect(() => {
        checkUserAuth();
    }, [checkUserAuth]);

    const GoogleLogin = () => {
        signInWithRedirect(auth, provider)
            .then((res) => console.log(res, "loggedin"))
            .catch((err) => console.log(err));
    };

    const SignUpHandler = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => console.log(user))
            .catch((err) => console.log(err.code));
    };

    const SignInHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(
                (userCredential) =>
                    localStorage.setItem(
                        "user",
                        JSON.stringify(userCredential.user)
                    ),
                console.log("signedin")
            )
            .catch((err) => console.log(err.code));
    };
    const SignOutHandler = () => {
        signOut(auth)
            .then((res) => {
                // Sign-out successful.
                alert("Sign-out successful.", res);
                localStorage.removeItem("user");
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            {isAuthenticated ? (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={SignOutHandler}
                >
                    Sign-out
                </button>
            ) : null}

            <div className="w-full max-w-xs ml-6">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={signIn ? SignInHandler : SignUpHandler}
                >
                    <h1 className="w-full text-center font-bold text-lg">
                        {signIn ? "Sign in" : "Sign Up"}
                    </h1>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <p className="text-red-500 text-xs italic ">
                            Please choose a password.
                        </p> */}
                    </div>
                    {signIn ? (
                        <button
                            className="block my-2 underline align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-auto w-max"
                            href="#"
                        >
                            Forgot Password?
                        </button>
                    ) : null}
                    <div className="flex items-center flex-col justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            {signIn ? "Sign In" : "Sign Up"}
                        </button>
                        <div className="w-full bg-gray-300 h-px my-2"></div>
                        <GoogleButton type="dark" onClick={GoogleLogin} />
                    </div>

                    <div className="w-max mx-auto mt-4">
                        {signIn ? (
                            <p className="text-xs w-max ml-auto">
                                Don't Have Account{" "}
                                <button
                                    className="text-blue-900 font-bold underline"
                                    onClick={() => setSignIn(!signIn)}
                                    type="button"
                                >
                                    Sign Up{" "}
                                </button>
                            </p>
                        ) : (
                            <p className="text-xs  w-max ml-auto ">
                                Already Registered{" "}
                                <button
                                    className="text-blue-900 font-bold underline"
                                    onClick={() => setSignIn(!signIn)}
                                    type="button"
                                >
                                    {" "}
                                    Sign In
                                </button>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Authentication;
