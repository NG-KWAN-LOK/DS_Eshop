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

  const chooseLogin = (isLogin) => {
    if (isLogin === true) {
      return (
        <div className={styles.signinLogin}>
          <div className={styles.title} onClick={routeChangeToUserPage}>
            {username}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.signinLogin}>
          <div className={styles.title} onClick={routeChangeToSignUp}>
            註冊
          </div>
          <div className={styles.title} onClick={routeChangeToLogin}>
            登入
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.navItem_container}>
      <div className={styles.navItem_container_contain}>
        <div className={styles.title} onClick={routeChangeToSeller}>
          賣家中心
        </div>
        {chooseLogin(isLogin)}
      </div>
    </div>
  );
};

export default React.memo(NavItem);
