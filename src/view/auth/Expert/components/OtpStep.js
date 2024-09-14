import React, { useState, useEffect } from "react";
import { Box, Typography, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfileToken,
  expertAuthActions,
  reSendOtpState,
} from "../sagas/expertAuthSlice";

const OtpStep = ({ control }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const addProfileTokenValue = useSelector(addProfileToken);
  const { loading, success, message } = useSelector(reSendOtpState);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    // Reset the timer if resend OTP fails
    if (!loading && !success && timer > 0) {
      setTimer(0);
    }
  }, [loading, success, timer]);

  const handleResendOtp = () => {
    if (timer === 0) {
      const data = { token: addProfileTokenValue };
      dispatch(expertAuthActions.reSendOtp(data));
      setTimer(60); // Start timer only when the API call is made
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Controller
        control={control}
        rules={{
          validate: (value) => value.length === 6,
        }}
        render={({ field, fieldState }) => (
          <Box sx={{ mb: 2 }}>
            <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
            {fieldState.invalid && (
              <FormHelperText error>OTP invalid</FormHelperText>
            )}
          </Box>
        )}
        name="otp"
      />
      {/* Message Box with Fixed Height */}
      <Box sx={{ minHeight: "20px", mb: 1 }}>
        {timer > 0 ? (
          <Typography variant="caption" color="textSecondary">
            You can request a new OTP after the timer ends.
          </Typography>
        ) : (
          !success &&
          message && (
            <Typography variant="caption" color="error">
              {message}
            </Typography>
          )
        )}
      </Box>
      <button
        onClick={handleResendOtp}
        disabled={timer > 0 || loading}
        style={{
          margin: "10px 0",
          padding: "10px 20px",
          backgroundColor: timer > 0 || loading ? "#ccc" : "#0069BF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: timer > 0 || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading
          ? "Resending OTP..."
          : timer > 0
          ? `Resend OTP (${timer}s)`
          : "Resend OTP"}
      </button>
    </Box>
  );
};

export default OtpStep;
