import React from "react";
import addavatar from "../images/addAvatar.png";
const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button>sign in</button>
        </form>
        <p>do you have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
