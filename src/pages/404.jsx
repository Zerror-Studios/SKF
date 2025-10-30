import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "BebasNeue",
        padding: "0 1rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: "700",
          margin: 0,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          color: "#555",
          marginTop: "0.5rem",
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </p>
    </div>
  );
};

export default NotFound;
