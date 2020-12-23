import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, Router, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

import styles from "./styles.scss";


interface HeaderProps { }

const ImageLoading = () => {
  return (
    <div className={styles.containersDiv}>
      <div className={styles.loader_container}>
        <div className={styles.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  );
};

export default ImageLoading;
