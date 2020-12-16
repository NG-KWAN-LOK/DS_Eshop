import React from "react";

import styles from "./styles.scss";


interface HeaderProps { }

const Alert = ({ type, content, setIsDisplayState }) => {
  setIsDisplayState()
  console.log(type)
  return (
    <div className={styles.containers}>
      <div className={styles.containers_block}>
        <div className={styles.containers_block_header}>
          {type === "success" ? <div className={styles.containers_block_icon_success}>
          </div> : <div className={styles.containers_block_icon_error}>
            </div>}
        </div>
        <div className={styles.containers_block_body}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Alert;
