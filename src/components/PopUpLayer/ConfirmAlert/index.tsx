import React, { useCallback, useRef, useState } from "react";
import { Link, Router, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

import styles from "./styles.scss";


interface HeaderProps { }

const ConfirmAlert = ({ title, content }) => {
  return (
    <div className={styles.containers}>
      <div className={styles.containers_block}>
        <div className={styles.containers_block_header}>
          {title}
        </div>
        <div className={styles.containers_block_body}>
          {content}
        </div>
        <div className={styles.containers_block_footer}>
        <div className={styles.containers_block_footer_cancelBtn}>
          取消
        </div>
        <div className={styles.containers_block_footer_confirmBtn}>
          確定
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
