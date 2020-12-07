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
  const userData = useSelector((appState: any) => appState.LoginReducer.userData);
  const [customerName, setCustomerName] = useState(userData.customerName);
  const [customerEmail, setCustomerEmail] = useState(userData.email);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(userData.phoneNumber);
  const [customerAddress, setCustomerAddress] = useState(userData.address);
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
    console.log(customerName, customerPhoneNumber, customerAddress, customerEmail);
    event.preventDefault();
  };
  const handleChangeCustomerName = (e) => {
    setCustomerName(e.target.value);
  };
  const handleChangeCustomerEmail = (e) => {
    setCustomerEmail(e.target.value);
  };
  const handleChangeCustomerPhoneNumber = (e) => {
    setCustomerPhoneNumber(e.target.value);
  };
  const handleChangeCustomerAddress = (e) => {
    setCustomerAddress(e.target.value);
  };
  const emailExpression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const phoneNumberExpression = /^\d{10}$/;
  let phoneNumberBlankText = "";
  let emailBlankText = "";
  function printIfCustomerNameBlank() {
    if (customerName === "") {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfCustomerEmailBlank() {
    if (customerEmail === "") {
      emailBlankText = "";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else if (
      customerEmail != "" &&
      customerEmail != null &&
      emailExpression.test(String(customerEmail).toLowerCase()) != true
    ) {
      emailBlankText = "請輸入正確的電郵地址: people@example.com";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      emailBlankText = "";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfCustomerAddressBlank() {
    if (customerAddress === "") {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfCustomerPhoneNumberBlank() {
    if (customerPhoneNumber === "") {
      phoneNumberBlankText = "";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else if (
      customerPhoneNumber != "" &&
      customerPhoneNumber != null &&
      phoneNumberExpression.test(String(customerPhoneNumber)) != true
    ) {
      phoneNumberBlankText = "請輸入正確的台灣手機號碼";
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      phoneNumberBlankText = "";
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  let isButtonDisable = true;
  function checkInputIsBlank() {
    if (customerName == null || customerPhoneNumber == null || customerEmail == null || customerAddress == null || customerName === "" || customerPhoneNumber === "" || customerEmail === "" || customerAddress === "" || emailExpression.test(String(customerEmail).toLowerCase()) != true || phoneNumberExpression.test(String(customerPhoneNumber)) != true) {
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
          我的檔案
        </div>
        <div className={styles.container_titleBar_subTitleContent}>
          管理你的檔案以保護你的帳戶
        </div>
        <div className={styles.container_profileContainer}>
          <form onSubmit={handleSubmit} className={styles.container_basicInfo}>
            <div className={styles.container_basicInfo_userName}>
              <div className={styles.container_basicInfo_userName_title}>
                使用者帳號
              </div>
              <div className={styles.container_basicInfo_userName_text}>
                {userData.userName}
              </div>
            </div>
            <div className={styles.container_basicInfo_customerName}>
              <div className={styles.container_basicInfo_customerName_title}>
                姓名
                </div>
              <input
                className={printIfCustomerNameBlank()}
                type="text"
                placeholder={"請輸入"}
                value={customerName}
                onChange={handleChangeCustomerName}
              />
            </div>
            <div className={styles.container_basicInfo_customerEmail}>
              <div className={styles.container_basicInfo_customerEmail_title}>
                Email
                </div>
              <input
                className={printIfCustomerEmailBlank()}
                type="text"
                placeholder={"請輸入"}
                value={customerEmail}
                onChange={handleChangeCustomerEmail}
              />
              <div className={styles.container_basicInfo_customerName_errorText}>
                {emailBlankText}
              </div>
            </div>
            <div className={styles.container_basicInfo_customerPhoneNumber}>
              <div className={styles.container_basicInfo_customerPhoneNumber_title}>
                手機號碼
                </div>
              <input
                className={printIfCustomerPhoneNumberBlank()}
                type="text"
                placeholder={"請輸入"}
                value={customerPhoneNumber}
                onChange={handleChangeCustomerPhoneNumber}
              />
              <div className={styles.container_basicInfo_customerName_errorText}>
                {phoneNumberBlankText}
              </div>
            </div>
            <div className={styles.container_basicInfo_customerName}>
              <div className={styles.container_basicInfo_customerName_title}>
                收件地址
                </div>
              <input
                className={printIfCustomerAddressBlank()}
                type="text"
                placeholder={"請輸入"}
                value={customerAddress}
                onChange={handleChangeCustomerAddress}
              />
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
