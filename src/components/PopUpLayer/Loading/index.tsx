import React, { useCallback, useRef, useState } from "react";
import { Link, Router, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

import styles from "./styles.scss";


interface HeaderProps { }

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  return (
    <div className={styles.containers}>
      <div className={styles.loader}><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default React.memo(NavItem);
