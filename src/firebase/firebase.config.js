// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCDBcgLkgbX_ce-Gd1F2niopNoQ5KPLzcM",
    // authDomain: "buzztalk-2248c.firebaseapp.com",
    // projectId: "buzztalk-2248c",
    // storageBucket: "buzztalk-2248c.appspot.com",
    // messagingSenderId: "567156146979",
    // appId: "1:567156146979:web:5d38a29954c53e750f8296"

    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;