import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGZFTlJWNQG3rmpFieqzacV4kGMp45wWU",
    authDomain: "shitify-25222.firebaseapp.com",
    projectId: "shitify-25222",
    storageBucket: "shitify-25222.appspot.com",
    messagingSenderId: "533475742115",
    appId: "1:533475742115:web:b94ec39211a3ee2b89ca16",
    measurementId: "G-19VR8GYP9N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
};
