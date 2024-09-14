import React from "react";
import styled from "@emotion/styled";
import { Button, CircularProgress, SxProps, Theme } from "@mui/material";

const CustomButton = styled(Button)({
  textTransform: "none",
  fontSize: "16px",
  "&:active": {
    backgroundColor: "#0069BF",
  },
  "@media (max-width: 600px)": {
    fontSize: "12px",
    padding: "16px",
  },
  // Add more media queries as needed
});

const ButtonComponent = ({
  btnTitle,
  sx,
  onBtnClick,
  disabled = false,
  loading,
  type = "",
  fullWidth = false,
}) => (
  <CustomButton
    variant="contained"
    sx={{
      backgroundColor: "#0069BF",
      color: "#FFFFFF",
      fontFamily: "Poppins Medium",
      "&:hover": {
        backgroundColor: "#0069BF", // Use theme for hover color
      },
      ...sx,
    }}
    fullWidth={fullWidth}
    onClick={onBtnClick}
    disabled={disabled}
    type={type}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : btnTitle}
  </CustomButton>
);
export default ButtonComponent;
