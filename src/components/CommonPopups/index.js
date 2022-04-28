import React, { lazy, Suspense } from "react";
import { useContext } from "react";
import { AppStoreContext } from "../../providers/AppStoreProvider";


import ForgotPassword from "../login/ForgotPassword";
import LoginPage from "../login/LoginPage";

// const ForgotPassword = lazy(() => import( /* webpackChunkName: "ForgotPassword" */ "../login/ForgotPassword"));
// const LoginPage = lazy(() => import( /* webpackChunkName: "LoginPage" */ "../login/LoginPage"));


const CommonPopups = () => {
  const { modal } = useContext(AppStoreContext);
  const { modalId } = modal;

  return (
    <>
      {modalId === 1 && <LoginPage show />}
      {modalId === 2 && <ForgotPassword show />}
    </>
  );
};

export default CommonPopups;
