import { put, takeLatest, call } from "redux-saga/effects";
import { expertAuthActions } from "./expertAuthSlice";
import expertAuthApi from "../../../../api/expertAuthApi";

/* -------------------- 🔐 Handle Login Saga -------------------- */
function* handleLogin(payload) {
  try {
    const response = yield call(expertAuthApi.loginUser, payload);
    const data = response?.data;
    if (data.success) {
      // Store the token in session storage on successful login
      sessionStorage.setItem("token", data?.data?.token);
      yield put(expertAuthActions.loginSuccess(data));
    } else {
      yield put(
        expertAuthActions.loginFailed(
          data || { message: "Login failed. Please try again.", success: false }
        )
      );
    }
  } catch (error) {
    // Handle network or API error
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.loginFailed(errorData));
  }
}

/* -------------------- 📋 Handle Sign Up Saga -------------------- */
function* handleSignUp(payload) {
  try {
    const response = yield call(expertAuthApi.signUpUser, payload);
    const data = response?.data;
    if (data.success) {
      yield put(expertAuthActions.signUpSuccess(data));
    } else {
      yield put(
        expertAuthActions.signUpFailed(
          data || {
            message: "Sign up failed. Please try again.",
            success: false,
          }
        )
      );
    }
  } catch (error) {
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.signUpFailed(errorData));
  }
}

/* -------------------- 🧾 Handle Add Profile Saga -------------------- */
function* handleAddProfile(payload) {
  try {
    const response = yield call(expertAuthApi.addProfile, payload);
    const data = response?.data;
    if (data.success) {
      yield put(expertAuthActions.addProfileSuccess(data));
    } else {
      yield put(
        expertAuthActions.addProfileFailed(
          data || {
            message: "Add Profile failed. Please try again.",
            success: false,
          }
        )
      );
    }
  } catch (error) {
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.addProfileFailed(errorData));
  }
}

/* -------------------- 🔢 Handle Verify Sign Up OTP Saga -------------------- */
function* handleVerifySignUpOtp(payload) {
  try {
    const response = yield call(expertAuthApi.verifySignUpOtp, payload);
    const data = response?.data;
    if (data.success) {
      // Store the auth token on successful OTP verification
      sessionStorage.setItem("token", data.data.authToken);
      yield put(expertAuthActions.verifySignUpOtpSuccess(data));
    } else {
      yield put(
        expertAuthActions.verifySignUpOtpFailed(
          data || {
            message: "SignUp failed. Please try again.",
            success: false,
          }
        )
      );
    }
  } catch (error) {
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.verifySignUpOtpFailed(errorData));
  }
}

/* -------------------- 📚 Handle Get Categories Saga -------------------- */
function* handleGetCategories(payload) {
  try {
    const response = yield call(expertAuthApi.getCategories, payload);
    const data = response?.data;
    if (data.success) {
      yield put(expertAuthActions.getCategoriesSuccess(data));
    } else {
      yield put(
        expertAuthActions.getCategoriesFailed(
          data || {
            message: "Categories failed. Please try again.",
            success: false,
          }
        )
      );
    }
  } catch (error) {
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.getCategoriesFailed(errorData));
  }
}

/* -------------------- 🔑 Handle Forgot Password Saga -------------------- */
function* handleForgetPassword(payload) {
  try {
    const response = yield call(expertAuthApi.forgotPassword, payload);
    const data = response?.data;
    if (data.success) {
      yield put(expertAuthActions.forgotPasswordSuccess(data));
    } else {
      yield put(
        expertAuthActions.forgotPasswordFailed(
          data || {
            message: "Forget password failed. Please try again.",
            success: false,
          }
        )
      );
    }
  } catch (error) {
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.forgotPasswordFailed(errorData));
  }
}

/* -------------------- 🔒 Handle Update Password Saga -------------------- */
function* handleUpdatePassword(payload) {
  try {
    const response = yield call(expertAuthApi.updatePassword, payload);
    const data = response?.data;
    if (data.success) {
      yield put(expertAuthActions.updatePasswordSuccess(data));
    } else {
      yield put(
        expertAuthActions.updatePasswordFailed(
          data || {
            message: "Update Password failed. Please try again.",
            success: false,
          }
        )
      );
    }
  } catch (error) {
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.updatePasswordFailed(errorData));
  }
}

/* -------------------- 📧 Handle Resend OTP Saga -------------------- */
function* handleReSendOtp(payload) {
  try {
    const response = yield call(expertAuthApi.reSendOtp, payload);
    const data = response?.data;
    if (data.success) {
      yield put(expertAuthActions.reSendOtpSuccess(data));
    } else {
      yield put(
        expertAuthActions.reSendOtpFailed(
          data || {
            message: "ReSend Otp failed. Please try again.",
            success: false,
          }
        )
      );
    }
  } catch (error) {
    const errorData = error?.response?.data || {
      message: "Network error. Please try again.",
      success: false,
    };
    yield put(expertAuthActions.reSendOtpFailed(errorData));
  }
}

/* -------------------- 🎯 Root Saga for Authentication -------------------- */
export function* expertAuthSaga() {
  yield takeLatest(expertAuthActions.login.type, handleLogin); // Watch for login action
  yield takeLatest(expertAuthActions.signUp.type, handleSignUp); // Watch for signup action
  yield takeLatest(expertAuthActions.addProfile.type, handleAddProfile); // Watch for add profile action
  yield takeLatest(
    expertAuthActions.verifySignUpOtp.type,
    handleVerifySignUpOtp
  ); // Watch for verify OTP action
  yield takeLatest(expertAuthActions.getCategories.type, handleGetCategories); // Watch for get categories action
  yield takeLatest(expertAuthActions.forgotPassword.type, handleForgetPassword); // Watch for forgot password action
  yield takeLatest(expertAuthActions.updatePassword.type, handleUpdatePassword); // Watch for update password action
  yield takeLatest(expertAuthActions.reSendOtp.type, handleReSendOtp); // Watch for resend OTP action
}
