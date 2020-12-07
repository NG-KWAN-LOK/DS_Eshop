import React, { useState, useCallback } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";

import styles from "./styles.scss";

import ForLogin from "../../components/LoginInPage/ForLogin";
import ForSignup from "../../components/LoginInPage/ForSignUp";
interface LoginProps {}

const Login = () => {
  // const history = useHistory();
  // const routeChangeToSignup = useCallback(() => {
  //   var path = "/login/signup";
  //   history.push(path);
  // }, []);

  return (
    <div className={styles.container}>
      <Route exact path={"/login"} component={ForLogin} />
      <Route path={"/login/signup"} component={ForSignup} />
    </div>
  );
};

export default Login;
