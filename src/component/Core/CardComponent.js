import { Card, CardContent, SxProps, Theme } from "@mui/material";
import React from "react";

const CardComponent = ({ children, sx, contentSx }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: "10px",
        boxShadow: `0px -4px 2px rgba(0, 0, 0, 0.1), 
            0px 4px 2px rgba(0, 0, 0, 0.1), 
            -4px 0px 2px rgba(0, 0, 0, 0.1),
4px 0px 2px rgba(0, 0, 0, 0.1)`,
        ...sx,
      }}
    >
      <CardContent sx={{ ...contentSx }}>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
