import React from "react";

const Loader = ({ text = "Analyzing" }) => {
  return (
    <div className="app-loader-overlay">
      <div className="loader-container">
        <div className="loader-core"></div>
        <div className="loader-ring ring-1"></div>
        <div className="loader-ring ring-2"></div>
        <div className="loader-ring ring-3"></div>
        <div className="loader-particle"></div>
      </div>
      <div className="loader-text">{text}</div>
    </div>
  );
};

export default Loader;
