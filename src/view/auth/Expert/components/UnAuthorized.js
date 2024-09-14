import { Typography } from "@mui/material";
import React from "react";

const UnAuthorized = () => {
  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography style={{ fontSize: "36px", fontFamily: "Poppins medium" }}>
        You are not authorized.
      </Typography>
    </div>
  );
};

export default UnAuthorized;
