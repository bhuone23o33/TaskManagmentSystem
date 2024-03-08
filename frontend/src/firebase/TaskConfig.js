// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZwz_ewifppBFRJwHqB7BMWzfHyzBAimQ",
    authDomain: "taskhandler-files.firebaseapp.com",
    projectId: "taskhandler-files",
    storageBucket: "taskhandler-files.appspot.com",
    messagingSenderId: "840246538691",
    appId: "1:840246538691:web:15126eb27b97fe9b484d76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);