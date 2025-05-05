// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
    apiKey: "AIzaSyDR-oDJsLADoNvMnnAexWG-Qn4IKtjLjIo",
    authDomain: "sample-firebase-ai-app-395f9.firebaseapp.com",
    projectId: "sample-firebase-ai-app-395f9",
    storageBucket: "sample-firebase-ai-app-395f9.firebasestorage.app",
    messagingSenderId: "318248292942",
    appId: "1:318248292942:web:2780d3cbec5209762ca91f"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


