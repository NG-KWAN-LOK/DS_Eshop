import React, { useCallback } from "react";
import { Link, Router, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

import * as loginActions from "../../../../containers/Login/actions";

import { checkIslogIn } from "../../../../utils/tools/index";

interface HeaderProps { }

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const username = useSelector((appState: any) => appState.LoginReducer.userData.userName);
  const routeChangeToSeller = useCallback(() => {
    var path = "/seller/product";
    history.push(path);
  }, []);
  const routeChangeToUserPage = useCallback(() => {
    var path = "/user/profile";
    history.push(path);
  }, []);
  const routeChangeToSignUp = useCallback(() => {
    var path = "/login/signup";
    history.push(path);
  }, []);
  const routeChangeToLogin = useCallback(() => {
    var path = "/login";
    history.push(path);
  }, []);
  function logOut() {
    history.push("/");
    localStorage.removeItem('userToken');
    window.location.reload(false);
  }
  function isLogined() {
    console.log("show login")
    return (
      <div className={styles.signinLogin}>
        <div className={styles.title} onClick={routeChangeToUserPage}>
          {username}
        </div>
        <div className={styles.title_under}>
          <div className={styles.title_under_subtitle} onClick={routeChangeToUserPage}>
            <span className={styles.title_under_text}>
              我的帳戶
                </span>
          </div>
          <div className={styles.title_under_subtitle} onClick={logOut}>
            <span className={styles.title_under_text}>
              登出
                </span>
          </div>
        </div>
      </div>
    );
  }
  function isNotLogined() {
    console.log("show notlogin")
    return (
      <div className={styles.noSigninLogin}>
        <div className={styles.title} onClick={routeChangeToSignUp}>
          註冊
        </div>
        <div className={styles.title} onClick={routeChangeToLogin}>
          登入
        </div>
      </div>
    );
  }
  return (
    <div className={styles.navItem_container}>
      <div className={styles.navItem_container_contain}>
        {username === "admin" && <Link to={{ pathname: "/admin" }}><div className={styles.title}>
          管理員頁面
        </div>
        </Link>}
        <div className={styles.title} onClick={routeChangeToSeller}>
          賣家中心
        </div>
        {isLogin ? isLogined() : isNotLogined()}
      </div>
    </div>
  );
};

export default React.memo(NavItem);
