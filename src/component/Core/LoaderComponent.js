import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoaderComponent = () => {
  return (
    <Backdrop
      sx={{
        backgroundColor: "#ffffff",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
    >
      <CircularProgress sx={{ color: "#0069BF" }} />
    </Backdrop>
  );
};

export default LoaderComponent;
