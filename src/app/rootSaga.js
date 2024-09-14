import { all } from "redux-saga/effects";
import { expertAuthSaga } from "../view/auth/Expert/sagas/expertAuthSaga";

export default function* rootSaga() {
  yield all([expertAuthSaga()]);
}
