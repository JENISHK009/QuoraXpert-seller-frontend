import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfileToken,
  expertAuthActions,
  signUpState,
  addProfileState,
  verifySignUpOtpState,
  signUpToken,
  categoriesState,
} from "../sagas/expertAuthSlice.js";
import Toast from "../../../../component/Core/Toast";
import { useTheme } from "@mui/material/styles";
import bgimg from "../../../../assets/images/newBg.jpg";
import bg from "../../../../assets/images/newBg.jpg";
import ButtonComponent from "../../../../component/Core/ButtonComponent";
import EmailStep from "../components/EmailStep.js";
import ProfileStep from "../components/ProfileStep.js";
import OtpStep from "../components/OtpStep.js";

// ... (keep all your styled components and other imports)
const StyledBox = styled(Box)(({ theme }) => ({
  width: "90%",
  maxWidth: "1200px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(8.5px)",
  borderRadius: "20px",
  overflow: "hidden",
  padding: "2rem",
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

const steps = ["Enter Email", "Complete Profile", "Verify OTP"];

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [toastData, setToastData] = useState({
    toastOpen: false,
    messageApi: "",
    severity: "success",
  });

  const signUpStateData = useSelector(signUpState);
  const addProfileStateData = useSelector(addProfileState);
  const verifySignUpOtpStateData = useSelector(verifySignUpOtpState);
  const SignUpToken = useSelector(signUpToken);
  const AddProfileToken = useSelector(addProfileToken);
  const categoriesData = useSelector(categoriesState);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  useEffect(() => {
    const currentState =
      activeStep === 0
        ? signUpStateData
        : activeStep === 1
        ? addProfileStateData
        : verifySignUpOtpStateData;

    if (currentState.message) {
      setToastData({
        toastOpen: true,
        messageApi: currentState.message,
        severity: currentState.success ? "success" : "error",
      });

      if (currentState.success) {
        if (activeStep < 2) {
          setActiveStep((prevStep) => prevStep + 1);
        } else if (activeStep === 2) {
          navigate("/dashboard");
        }
      }
    }
  }, [
    signUpStateData,
    addProfileStateData,
    verifySignUpOtpStateData,
    activeStep,
    navigate,
  ]);

  useEffect(() => {
    dispatch(expertAuthActions.getCategories({}));
  }, [dispatch]);

  const onSubmitEmail = (data) => {
    setEmail(data.email);
    dispatch(expertAuthActions.signUp(data));
  };

  const onSubmitProfile = (data) => {
    const token = SignUpToken;
    const profileData = { ...data, token, email };
    dispatch(expertAuthActions.addProfile(profileData));
  };

  const onSubmitOtp = (data) => {
    const token = AddProfileToken;
    const otpData = { token, otp: data.otp };
    dispatch(expertAuthActions.verifySignUpOtp(otpData));
  };

  const stepComponents = useMemo(
    () => [
      <EmailStep control={control} errors={errors} register={register} />,
      <ProfileStep
        control={control}
        errors={errors}
        register={register}
        categoriesData={categoriesData}
      />,
      <OtpStep control={control} />,
    ],
    [control, errors, register, categoriesData]
  );

  const currentStepComponent = stepComponents[activeStep];

  const onSubmit = handleSubmit(
    activeStep === 0
      ? onSubmitEmail
      : activeStep === 1
      ? onSubmitProfile
      : onSubmitOtp
  );

  const isLoading =
    activeStep === 0
      ? signUpStateData.loading
      : activeStep === 1
      ? addProfileStateData.loading
      : verifySignUpOtpStateData.loading;

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
                Create Your Account
              </Typography>
              <Typography variant="body2">
                Please follow the steps to sign up
              </Typography>
            </Box>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <form onSubmit={onSubmit}>
              {currentStepComponent}
              <ButtonComponent
                btnTitle={activeStep === 2 ? "Verify OTP" : "Continue"}
                type="submit"
                fullWidth
                loading={isLoading}
                sx={{ mt: 3 }}
              />
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer", color: theme.palette.primary.main }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </Typography>
          </Container>
        </FormSection>
      </StyledBox>
      {toastData.toastOpen && (
        <Toast
          open={toastData.toastOpen}
          onClose={() =>
            setToastData((prev) => ({ ...prev, toastOpen: false }))
          }
          toastSeverity={toastData.severity}
          autoHideDuration={4000}
          message={toastData.messageApi}
        />
      )}
    </Box>
  );
}
