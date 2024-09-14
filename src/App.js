import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoaderComponent from "./component/Core/LoaderComponent";
// import "./assets/scss/fonts.scss";

// Lazy-loaded Pages
const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));
// const HomePage = lazy(() => import("./pages/HomePage"));
//Auth Pages
const LoginPage = lazy(() => import("./view/auth/Expert/pages/LoginPage"));
const SignUpPage = lazy(() => import("./view/auth/Expert/pages/SignUpPage"));
const DashBoardPage = lazy(() =>
  import("./view/auth/Expert/pages/DashBoardPage")
);
// const CallBack = lazy(() => import("./pages/Auth/Callback"));
const UnAuthorized = lazy(() =>
  import("./view/auth/Expert/components/UnAuthorized")
);

const App = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("userToken");

  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashBoard" element={<DashBoardPage />} />
          {/* <Route path="/callback" element={<CallBack />} /> */}
          {/* <Route path="/ccm" element={<PrivateRoute />}>
            <Route index element={<SearchUserPage />} />
            <Route path="user/:userId" element={<UserDetailsPage />} />
          </Route> */}
          <Route path="unauthorized" element={<UnAuthorized />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
