import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, Router, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

import styles from "./styles.scss";


interface HeaderProps {}

const Loading = (containersClassName) => {
  const history = useHistory();
  const [displayErrorMessage, setDisplayErrorMessage] = useState(" ");
  useEffect(()=>{
    setTimeout(() => {
      setDisplayErrorMessage("請需稍後片刻...")
    }, 2000); 
    setTimeout(() => {
      setDisplayErrorMessage("您知道嗎？ 在非洲，每60秒，就有1分鐘過去...")
    }, 5000); 
    setTimeout(() => {
      setDisplayErrorMessage("老師說：下堂課小考，同學：...")
    }, 9000); 
    setTimeout(() => {
      setDisplayErrorMessage("您知道嗎？台灣人在睡覺時，大多數美國人在工作。...")
    }, 12000); 
    setTimeout(() => {
      setDisplayErrorMessage("不用急，最重要快...")
    }, 15000); 
    setTimeout(() => {
      setDisplayErrorMessage("您知道嗎？把電腦關了，就不用再等了...")
    }, 18000); 
    setTimeout(() => {
      setDisplayErrorMessage("超時...")
    }, 21000); 
  },[])
  return (
    <div className={containersClassName ? styles.containersDiv:styles.containersMain}>
      <div className={styles.loader_container}>
        <div className={styles.loader_container_top}>
          <div className={styles.loader}><div></div><div></div><div></div><div></div></div>
        </div>
        <div className={styles.loader_message}>
          {displayErrorMessage}
        </div>
      </div>
    </div>
  );
};

export default Loading;
