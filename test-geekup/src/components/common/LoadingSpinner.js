import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-center"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
