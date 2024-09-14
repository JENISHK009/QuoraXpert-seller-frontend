/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Step,
  Stepper,
  StepLabel,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../../../component/Core/ButtonComponent";
import {
  expertAuthActions,
  forgetPasswordToken,
  forgotPasswordState,
  updatePasswordState,
} from "../../sagas/expertAuthSlice";
import Toast from "../../../../../component/Core/Toast";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ForgotPasswordModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [toastData, setToastData] = useState({
    toastOpen: false,
    messageApi: "",
    severity: "success",
  });

  const ForgetPasswordToken = useSelector(forgetPasswordToken);
  const ForgotPasswordState = useSelector(forgotPasswordState);
  const UpdatePasswordState = useSelector(updatePasswordState);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const steps = ["Enter Email", "Enter OTP", "Reset Password"];

  // Loader state
  const isLoading = ForgotPasswordState.loading || UpdatePasswordState.loading;

  useEffect(() => {
    if (ForgotPasswordState.success) {
      setToastData({
        toastOpen: true,
        messageApi: ForgotPasswordState.message,
        severity: "success",
      });
      setActiveStep(1);
    }
  }, [ForgotPasswordState.success, ForgotPasswordState.message]);

  useEffect(() => {
    if (UpdatePasswordState.success) {
      setToastData({
        toastOpen: true,
        messageApi: UpdatePasswordState.message,
        severity: "success",
      });
      handleClose();
      reset();
      setActiveStep(0);
      setTimeout(() => navigate("/login"), 500);
    } else if (UpdatePasswordState.message) {
      setToastData({
        toastOpen: true,
        messageApi: UpdatePasswordState.message || "Password update failed",
        severity: "error",
      });
    }
  }, [UpdatePasswordState.success, UpdatePasswordState.message]);

  const onSubmitEmail = (data) => {
    dispatch(expertAuthActions.forgotPassword(data));
  };

  const onSubmitOtp = () => {
    setActiveStep(2);
  };

  const onSubmitNewPassword = (data) => {
    const { otp, password } = data;
    dispatch(
      expertAuthActions.updatePassword({
        otp,
        password,
        token: ForgetPasswordToken,
      })
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        );
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter the OTP sent to your email
            </Typography>
            <Controller
              control={control}
              name="otp"
              rules={{
                required: "OTP is required",
                validate: (value) =>
                  value.length === 6 || "OTP must be 6 digits",
              }}
              render={({ field, fieldState }) => (
                <Box>
                  <MuiOtpInput {...field} length={6} sx={{ gap: 1 }} />
                  {fieldState.invalid && (
                    <FormHelperText error>{errors.otp?.message}</FormHelperText>
                  )}
                </Box>
              )}
            />
          </Box>
        );
      case 2:
        return (
          <>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="New Password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
            {/* <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === control._formValues.password ||
                  "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirm New Password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            /> */}
          </>
        );
      default:
        return null;
    }
  };

  const handleStepSubmit = (data) => {
    switch (activeStep) {
      case 0:
        onSubmitEmail(data);
        break;
      case 1:
        onSubmitOtp(data);
        break;
      case 2:
        onSubmitNewPassword(data);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => handleClose()}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Forgot Password
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 100,
              }}
            >
              <CircularProgress />
            </Box>
          ) : ( */}
          <form onSubmit={handleSubmit((data) => handleStepSubmit(data))}>
            {renderStepContent(activeStep)}
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <ButtonComponent
                btnTitle="Back"
                onClick={handleBack}
                disabled={activeStep === 0}
              />
              {activeStep === steps.length - 1 ? (
                <ButtonComponent
                  btnTitle="Reset Password"
                  type="submit"
                  loading={isLoading}
                />
              ) : (
                <ButtonComponent
                  btnTitle="Next"
                  onClick={handleNext}
                  loading={isLoading}
                />
              )}
            </Box>
          </form>
          {/* )} */}
        </Box>
      </Modal>
      {toastData.toastOpen && (
        <Toast
          open={toastData.toastOpen}
          onClose={() => setToastData((i) => ({ ...i, toastOpen: false }))}
          toastSeverity={toastData.severity}
          autoHideDuration={4000}
          message={toastData.messageApi}
        />
      )}
    </>
  );
};

export default ForgotPasswordModal;
