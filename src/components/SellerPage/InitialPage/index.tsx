import React, { useCallback, useRef, useState } from "react";
import { Link, Router, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

import styles from "./styles.scss";

import * as loginActions from "../../../containers/Login/actions";

import Header from "../../Header/LoginHeader";

interface HeaderProps { }

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    console.log(username, password);
    event.preventDefault();
    dispatch(loginActions.setIsLogin(true));
    history.push("/");
  };

  let loginContent_submitBtn = "loginContent_submitBtn";
  let isButtonDisable = true;
  let userNameBlankText = "";
  let passwordBlankText = "";
  function checkInputIsBlank() {
    if (
      username == null ||
      password == null ||
      username === "" ||
      password === ""
    ) {
      console.log("blank");
      loginContent_submitBtn += " loginContent_submitBtn-not-allow";
      isButtonDisable = true;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-not-allow"]}`;
    } else {
      console.log("fill");
      loginContent_submitBtn += " loginContent_submitBtn-allow";
      isButtonDisable = false;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-allow"]}`;
    }
  }
  function printIfUserNameBlank() {
    if (username === "") {
      userNameBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      userNameBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfPasswordBlank() {
    if (password === "") {
      passwordBlankText = "請填寫此欄位";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      passwordBlankText = "　";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  return (
    <div>
      <Header />
      <div className={styles.top_Padding}></div>
      <div className={styles.loginContent}>
        <div className={styles.loginContent_loginFrame}>
          <div className={styles.loginContent_loginFrame_title}>登入</div>

          <form onSubmit={handleSubmit}>
            <input
              className={printIfUserNameBlank()}
              type="text"
              placeholder={"使用者名稱"}
              value={username}
              onChange={handleChangeUsername}
            />
            <div className={styles.loginContent_errorText}>
              {userNameBlankText}
            </div>
            <input
              className={printIfPasswordBlank()}
              type="password"
              placeholder={"密碼"}
              value={password}
              onChange={handleChangePassword}
            />
            <div className={styles.loginContent_errorText}>
              {passwordBlankText}
            </div>
            <input
              className={checkInputIsBlank()}
              type="submit"
              value="登入"
              disabled={isButtonDisable}
            />
          </form>
          <div className={styles.loginContent_subcontent}>
            <div className={styles.loginContent_subcontent_subtitle}>
              還沒有帳號？
            </div>
            <Link to={"/login/signup"}>
              <div className={styles.loginContent_subcontent_signup}>註冊</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavItem);
