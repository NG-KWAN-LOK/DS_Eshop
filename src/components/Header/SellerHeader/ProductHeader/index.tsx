import React, { useCallback } from "react";
import { Link, Router, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import * as loginActions from "../../../../containers/Login/actions";

import styles from "./styles.scss";

interface HeaderProps { }

const ProductHeader = ({ title }) => {
  const history = useHistory();
  const titleContent = title;
  const username = useSelector((appState: any) => appState.LoginReducer.userData.userName);


  const routeChangeToDashboard = useCallback(() => {
    var path = "/";
    history.push(path);
  }, []);
  const routeChangeToUserPage = useCallback(() => {
    var path = "/user/profile";
    history.push(path);
  }, []);

  return (
    <div className={`${styles.navItem_container}`}>
      <div className={styles.navItem_container_contain}>
        <div className={styles.navItem_container_contain_left}>
          <div className={styles.icon} onClick={routeChangeToDashboard}></div>
          <div className={styles.title}>{titleContent}</div>
        </div>
        <div className={styles.navItem_container_contain_right}>
          <div className={styles.signinLogin}>
            <div className={styles.usernameTitle} onClick={routeChangeToUserPage}>
              {username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
