// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFi2Atrc7OCTCXPPoNgnZ0QYvc330YCok",
  authDomain: "chat-app-57ca6.firebaseapp.com",
  projectId: "chat-app-57ca6",
  storageBucket: "chat-app-57ca6.appspot.com",
  messagingSenderId: "774887445523",
  appId: "1:774887445523:web:5de51f4f0b229d571ddbe6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getDatabase();
