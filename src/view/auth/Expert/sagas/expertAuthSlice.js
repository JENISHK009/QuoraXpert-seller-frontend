import { createSlice } from "@reduxjs/toolkit";
import {
  setFailureState,
  setLoadingState,
  setSuccessState,
} from "../../../../utils/ReduxUtils";

// Initial state
const initialState = {
  login: {
    loading: false,
    message: "",
    success: false,
  },
  signup: {
    loading: false,
    message: "",
    success: false,
  },
  addProfile: {
    loading: false,
    message: "",
    success: false,
  },
  verifySignUpOtp: {
    loading: false,
    message: "",
    success: false,
  },
  getCategories: {
    loading: false,
    message: "",
    success: false,
  },
  forgotPassword: {
    loading: false,
    message: "",
    success: false,
  },
  updatePassword: {
    loading: false,
    message: "",
    success: false,
  },
  reSendOtp: {
    loading: false,
    message: "",
    success: false,
  },
  isLoggedIn: false,
  currentUser: null,
  addProfileToken: null,
  signUpToken: null,
  verifySignUpOtpToken: null,
  forgetPasswordToken: null,
  categories: null,
};
console.log("🚀 ~ initialState.login:", initialState.login);

// Create Slice
const expertAuthSlice = createSlice({
  name: "expertAuth",
  initialState,
  reducers: {
    /*-----------📝🚀 Expert Login  📝🚀 -----------*/
    login(state) {
      setLoadingState(state.login);
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.currentUser = action.payload.data;
      setSuccessState(state.login, action);
    },
    loginFailed(state, action) {
      setFailureState(state.login, action, "Login failed. Please try again.");
    },
    resetLoginState(state) {
      setFailureState(state.login, "", "");
    },

    /*-----------📝🚀 Expert Signup  📝🚀 -----------*/
    signUp(state) {
      setLoadingState(state.signup);
    },
    signUpSuccess(state, action) {
      state.signUpToken = action.payload.data.token;
      setSuccessState(state.signup, action);
    },
    signUpFailed(state, action) {
      setFailureState(state.signup, action, "Signup failed. Please try again.");
    },

    /* -----------🧑‍💻📋 Add Profile Data 🧑‍💻📋 -----------*/
    addProfile(state) {
      setLoadingState(state.addProfile);
    },
    addProfileSuccess(state, action) {
      state.addProfileToken = action.payload.data.token;
      setSuccessState(state.addProfile, action);
    },
    addProfileFailed(state, action) {
      setFailureState(
        state.addProfile,
        action,
        "Add Profile failed. Please try again."
      );
    },

    /*----------- ✉️🔐 Email OTP Verification ✉️🔐 -----------*/
    verifySignUpOtp(state) {
      setLoadingState(state.verifySignUpOtp);
    },
    verifySignUpOtpSuccess(state, action) {
      state.verifySignUpOtpToken = action.payload.data.token;
      setSuccessState(state.verifySignUpOtp, action);
    },
    verifySignUpOtpFailed(state, action) {
      setFailureState(
        state.verifySignUpOtp,
        action,
        "OTP verification failed. Please try again."
      );
    },

    /*----------- 📂🔍 Fetch Profile Categories 📂🔍 -----------*/
    getCategories(state) {
      setLoadingState(state.getCategories);
    },
    getCategoriesSuccess(state, action) {
      state.categories = action.payload.data;
      setSuccessState(state.getCategories, action);
    },
    getCategoriesFailed(state, action) {
      setFailureState(
        state.getCategories,
        action,
        "Fetching categories failed. Please try again."
      );
    },

    /*----------- 🛠️ Forgot Password 🛠️ -----------*/
    forgotPassword(state) {
      setLoadingState(state.forgotPassword);
    },
    forgotPasswordSuccess(state, action) {
      state.forgetPasswordToken = action.payload.data.token;
      setSuccessState(state.forgotPassword, action);
    },
    forgotPasswordFailed(state, action) {
      setFailureState(
        state.forgotPassword,
        action,
        "Forgot password failed. Please try again."
      );
    },

    /*----------- 🔑 Update Password 🔑 -----------*/
    updatePassword(state) {
      setLoadingState(state.updatePassword);
    },
    updatePasswordSuccess(state, action) {
      setSuccessState(state.updatePassword, action);
    },
    updatePasswordFailed(state, action) {
      setFailureState(
        state.updatePassword,
        action,
        "Update password failed. Please try again."
      );
    },

    /*----------- 📧 Resend OTP 📧 -----------*/
    reSendOtp(state) {
      setLoadingState(state.reSendOtp);
    },
    reSendOtpSuccess(state, action) {
      setSuccessState(state.reSendOtp, action);
    },
    reSendOtpFailed(state, action) {
      setFailureState(
        state.reSendOtp,
        action,
        "Resend OTP failed. Please try again."
      );
    },
  },
});

// Actions
export const expertAuthActions = expertAuthSlice.actions;

// Selectors
export const loginState = (state) => state.expertAuth.login;
export const signUpState = (state) => state.expertAuth.signup;
export const addProfileState = (state) => state.expertAuth.addProfile;
export const verifySignUpOtpState = (state) => state.expertAuth.verifySignUpOtp;
export const getCategoriesState = (state) => state.expertAuth.getCategories;
export const forgotPasswordState = (state) => state.expertAuth.forgotPassword;
export const updatePasswordState = (state) => state.expertAuth.updatePassword;
export const reSendOtpState = (state) => state.expertAuth.reSendOtp;

export const isLoggedInState = (state) => state.expertAuth.isLoggedIn;
export const currentUserState = (state) => state.expertAuth.currentUser;
export const categoriesState = (state) => state.expertAuth.categories;

// Token Selectors
export const signUpToken = (state) => state.expertAuth.signUpToken;
export const addProfileToken = (state) => state.expertAuth.addProfileToken;
export const verifySignUpOtpToken = (state) =>
  state.expertAuth.verifySignUpOtpToken;
export const forgetPasswordToken = (state) =>
  state.expertAuth.forgetPasswordToken;

// Reducer
const expertAuthReducer = expertAuthSlice.reducer;
export default expertAuthReducer;
