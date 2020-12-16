import React from "react";

import styles from "./styles.scss";


interface HeaderProps { }

const ConfirmAlert = ({ title, content, onCancel, onConfirm }) => {
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
          <div className={styles.containers_block_footer_cancelBtn} onClick={onCancel}>
            取消
        </div>
          <div className={styles.containers_block_footer_confirmBtn} onClick={onConfirm}>
            確定
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
