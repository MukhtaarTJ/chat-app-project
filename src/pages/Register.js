// Register.js

import React, { useState } from "react";
import addavatar from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref as dbRef, set as dbSet } from "firebase/database";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useAuthContext } from "../hooks/useAuthContext";
import { auth, db, storage } from "../firebase";

const Register = () => {
  const { dispatch } = useAuthContext();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set display name
      await updateProfile(auth.currentUser, { displayName });

      // File upload logic
      if (file) {
        const avatarRef = storageRef(
          storage,
          `avatars/${userCredential.user.uid}`
        );
        const uploadTask = uploadBytesResumable(avatarRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle state change events
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // Update user profile with avatar URL
              await updateProfile(userCredential.user, {
                displayName,
                photoURL: downloadURL,
              });

              // Store user details in Realtime Database
              const userRef = dbRef(db, `users/${userCredential.user.uid}`);
              await dbSet(userRef, {
                uid: userCredential.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              const userChats = dbRef(
                db,
                `usersChats/${userCredential.user.uid}`
              );
              await dbSet(userChats, {});

              // Dispatch the "SET_USER" action to update the user in the context
              dispatch({ type: "SET_USER", payload: userCredential.user });

              // Navigate to the home page
              // navigate("/home");

              setLoading(false);
            } catch (urlError) {
              console.error("Error getting download URL:", urlError.message);
              setErrorMessage("Error getting avatar URL. Please try again.");
              setLoading(false);
            }
          }
        );
      } else {
        // If no file, continue without uploading an avatar
        setLoading(false);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration Error:", errorCode, errorMessage);
      setErrorMessage(errorMessage || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Your Logo</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="file"
            id="file"
            style={{ visibility: "hidden", position: "absolute" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <img src={addavatar} alt="" />
            <span>Add an avatar</span>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <p>Do you have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
