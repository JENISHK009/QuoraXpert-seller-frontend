/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  expertAuthActions,
  // loginLoading,
  // loginMessage,
  // loginSuccess,
  loginState,
} from "../sagas/expertAuthSlice";
import Toast from "../../../../component/Core/Toast";
import { useTheme } from "@mui/material/styles";
import bg from "../../../../assets/images/heroicon.jpg";
import bgimg from "../../../../assets/images/newBg.jpg";
import ButtonComponent from "../../../../component/Core/ButtonComponent";
import ForgotPasswordModal from "../components/modal/ForgotPasswordModal";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "1200px",
  height: "60%",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(8.5px)",
  borderRadius: "20px",
  overflow: "hidden",
  display: "flex",
  padding: "2rem 1rem",
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: "10px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [toastData, setToastData] = useState({
    toastOpen: false,
    messageApi: "",
    severity: "success",
  });

  //Selectors
  const LoginState = useSelector(loginState);
  // const message = useSelector(loginState.message);
  // const success = useSelector(loginState.success);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();

  useEffect(() => {
    if (LoginState.success) {
      setToastData({
        toastOpen: true,
        messageApi: LoginState.message,
        severity: "success",
      });
      const timer = setTimeout(() => {
        navigate("/dashboard");
        dispatch(expertAuthActions.resetLoginState());
      }, 2000);

      // Clean up the timer
      return () => clearTimeout(timer);
    } else if (LoginState.message) {
      setToastData({
        toastOpen: true,
        messageApi: LoginState.message,
        severity: "error",
      });
    }
  }, [LoginState]);

  const onSubmit = async (data) => {
    dispatch(expertAuthActions.login(data));
    if (remember) {
      const emailField = document.getElementById("email");
      const passwordField = document.getElementById("password");

      emailField.value = data.email;
      passwordField.value = data.password;

      // trigger();
    }
  };

  const handleOpenForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => setOpenForgotPassword(false);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledBox>
        <ImageSection />
        <FormSection>
          <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body2">
                Please sign in to your account
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledTextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                {...register("password", { required: "Password is required" })}
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Typography
                  variant="body2"
                  onClick={handleOpenForgotPassword}
                  sx={{ cursor: "pointer", color: theme.palette.primary.main }}
                >
                  Forgot password?
                </Typography>
                <ForgotPasswordModal
                  open={openForgotPassword}
                  handleClose={handleCloseForgotPassword}
                />
              </Box>
              <ButtonComponent
                type="submit"
                fullWidth={true}
                loading={LoginState.loading}
                btnTitle="Sign In"
              />
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Not registered yet?{" "}
                <span
                  style={{
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Create an Account
                </span>
              </Typography>
            </form>
          </Container>
        </FormSection>
      </StyledBox>
      {toastData.toastOpen && (
        <Toast
          open={toastData.toastOpen}
          onClose={() => setToastData((i) => ({ ...i, toastOpen: false }))}
          toastSeverity={toastData.severity}
          autoHideDuration={4000}
          message={toastData.messageApi}
        />
      )}
    </Box>
  );
}
