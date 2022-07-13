import React from "react";
import { Link } from "react-router-dom";
import "../UI/Selection.css";
function Selection() {
  return (
    <div className="main">
      <div className="sub-main">
        <div className="container">
        <h1><u>Who Are You ?</u></h1>
          <div className="abc" >
          <Link to="/client">
            <button className="button">CLIENT</button>
          </Link>
          <Link to="/login">
            <button className="button">VENDOR</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selection;
