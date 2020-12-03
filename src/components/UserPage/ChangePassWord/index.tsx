import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";
import GoodsApi from "../../../utils/api/apifetcher/goods";

import * as loginActions from "../../../containers/Login/actions";

interface HeaderProps { }

const Product = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const username = useSelector((appState: any) => appState.LoginReducer.userData.userName);
  const [enterPassWord, setenterPassWord] = useState();
  const [confirmPassWord, setconfirmPassWord] = useState();
  //const goodsCount = 0;
  useEffect(() => {
    GoodsApi.getGoodsList()
      .then((res) => {
        //console.log(res);
        getGoodsList(res);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  const handleSubmit = (event) => {
    console.log();
    event.preventDefault();
  };
  const handleChangeEnterPassWord = (e) => {
    setenterPassWord(e.target.value);
  };
  const handleChangeConfirmPassWord = (e) => {
    setconfirmPassWord(e.target.value);
  };
  let confirmPassWordBlankText = "";
  function printIfEnterPassWordBlank() {
    if (enterPassWord === "") {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfConfirmPassWordBlank() {
    if (confirmPassWord === "") {
      confirmPassWordBlankText = "";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else if (
      confirmPassWord != "" &&
      confirmPassWord != null &&
      confirmPassWord != enterPassWord
    ) {
      confirmPassWordBlankText = "密碼不一致";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      confirmPassWordBlankText = "";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  let isButtonDisable = true;
  function checkInputIsBlank() {
    if (confirmPassWord === "" ||
      confirmPassWord == null ||
      confirmPassWord != enterPassWord) {
      console.log("blank");
      isButtonDisable = true;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-not-allow"]}`;
    } else {
      console.log("fill");
      isButtonDisable = false;
      return `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-allow"]}`;
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_titleBar_titleContent}>
          更改密碼
        </div>
        <div className={styles.container_titleBar_subTitleContent}>
          為了保護你帳號的安全，請不要分享你的密碼給其他人
        </div>
        <div className={styles.container_profileContainer}>
          <form onSubmit={handleSubmit} className={styles.container_basicInfo}>
            <div className={styles.container_basicInfo_enterPassWord}>
              <div className={styles.container_basicInfo_enterPassWord_title}>
                新的密碼
                </div>
              <input
                className={printIfEnterPassWordBlank()}
                type="text"
                placeholder={"請輸入"}
                value={enterPassWord}
                onChange={handleChangeEnterPassWord}
              />
            </div>
            <div className={styles.container_basicInfo_confirmPassWord}>
              <div className={styles.container_basicInfo_confirmPassWord_title}>
                確認密碼
                </div>
              <input
                className={printIfConfirmPassWordBlank()}
                type="text"
                placeholder={"請輸入"}
                value={confirmPassWord}
                onChange={handleChangeConfirmPassWord}
              />
              <div className={styles.container_basicInfo_confirmPassWord_errorText}>
                {confirmPassWordBlankText}
              </div>
            </div>
            <div className={styles.container_functionKey}>
              <input
                className={checkInputIsBlank()}
                type="submit"
                value="儲存"
                disabled={isButtonDisable}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
