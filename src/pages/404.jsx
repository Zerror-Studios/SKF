"use client";

import Button from "@/components/common/Button";
import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

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
          marginBottom: "1rem",
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Button
        onClick={() => router.push("/")}
        title="Go to Homepage"
        color="black"
      />
    </div>
  );
};

export default NotFound;