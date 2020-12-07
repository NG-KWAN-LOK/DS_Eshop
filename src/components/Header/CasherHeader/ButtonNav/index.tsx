import React, { useCallback, useRef, useState } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";

import styles from "./styles.scss";

import Search from "../../../../containers/Search";

interface HeaderProps { }

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <div className={`${styles.navItem_container}`}>
      <div className={styles.navItem_container_contain}>
        <Link to={"/"}>
          <div className={styles.icon}></div>
        </Link>
        <div className={styles.iconTitle}>結帳</div>
      </div>
    </div>
  );
};

export default React.memo(NavItem);
