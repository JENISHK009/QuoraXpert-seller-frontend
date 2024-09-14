import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { history } from "../utils/History";
import rootSaga from "./rootSaga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import expertAuthSlice from "../view/auth/Expert/sagas/expertAuthSlice";

const rootReducer = combineReducers({
  router: connectRouter(history),
  expertAuth: expertAuthSlice,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);
