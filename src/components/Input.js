import React from "react";
import img from "../images/img.png";
import attach from "../images/attach.png";
const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something...." />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button>send</button>
      </div>
    </div>
  );
};

export default Input;
