import React from "react";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import styled from "@emotion/styled";

// Interface for styling props

const StyledInfoIcon = styled(InfoOutlinedIcon)(() => ({
  color: "#0069BF",
  marginBottom: "17px",
  fontSize: "45px",
}));

const NoDataComponent = ({ message }) => {
  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <StyledInfoIcon />
        <Box>
          <Typography
            sx={{
              color: "#3c4c57",
              fontSize: "16px",
              fontFamily: "Poppins Regular",
              marginBottom: "3px",
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NoDataComponent;
