/* eslint-disable no-unused-vars */
import { Alert, AlertProps, Snackbar } from "@mui/material";
import React from "react";

const Toast = ({
  open,
  onClose,
  autoHideDuration = 3000,
  toastSeverity = "success",
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={toastSeverity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
