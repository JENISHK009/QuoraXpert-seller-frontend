import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Drawer,
  Typography,
  SxProps,
  Slide,
} from "@mui/material";
import ButtonComponent from "./ButtonComponent";

const drawerStyle = {
  boxShadow: "none",
  height: "100vh",
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
  },
  "& .MuiPaper-root": {
    overflowX: "hidden",
  },
  "&:focus-visible": {
    outline: "none",
  },
};

const DrawerComponent = ({
  handleClose,
  open,
  headerTitle,
  submitBtnTitle = "",
  closeBtnTitle = "",
  onSubmitBtnClick,
  onCloseBtnClick,
  children,
  loading,
  contentSx,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose} sx={drawerStyle}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Card sx={{ boxShadow: "none", height: "100vh" }}>
          <CardHeader
            sx={{
              backgroundColor: "#EFEEEE",
              borderBottom: "1px solid #C2C2C2",
              padding: "23px 0 7px 19px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            title={
              <Typography
                sx={{
                  color: "#181623",
                  fontSize: "20px",
                  fontFamily: "Poppins Medium",
                  lineHeight: "30px",
                }}
              >
                {headerTitle}
              </Typography>
            }
          />
          <CardContent sx={{ ...contentSx }}>{children}</CardContent>
          <CardActions
            sx={{
              backgroundColor: "#EFEEEE",
              borderBottom: "1px solid #C2C2C2",
              bottom: "0px !important",
              position: "absolute",
              width: "97%",
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            {submitBtnTitle && (
              <ButtonComponent
                btnTitle={submitBtnTitle}
                onBtnClick={(e) => onSubmitBtnClick?.(e)}
                loading={loading}
                disabled={loading}
              />
            )}
            {closeBtnTitle && (
              <ButtonComponent
                btnTitle={closeBtnTitle}
                onBtnClick={(e) => onCloseBtnClick?.(e)}
                sx={{ backgroundColor: "#507087" }}
              />
            )}
          </CardActions>
        </Card>
      </Slide>
    </Drawer>
  );
};

export default DrawerComponent;
