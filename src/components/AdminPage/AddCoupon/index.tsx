import React, { useCallback, useRef, useState } from "react";
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
import { categoryList } from "../../../utils/constants";

import adminApi from "../../../utils/api/apifetcher/admin";
import Loading from "../../PopUpLayer/Loading";
import Alert from "../../PopUpLayer/Alert";

interface HeaderProps { }

const AddProduct = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [couponName, setCouponName] = useState();
  const [description, setDescription] = useState();
  const [discountContent, setCouponContent] = useState();
  const [couponStartDate, setCouponStartDate] = useState();
  const [couponEndDate, setCouponEndDate] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("網路錯誤");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(couponName, discountContent, couponStartDate, couponEndDate);
    setIsloading(true);
    await adminApi
      .newCoupon(couponName, description, discountContent, couponStartDate, couponEndDate)
      .then((res) => {
        console.log("success");
        history.push("/admin/coupon");
      })
      .catch((err) => {
        console.log("fail");
        setIsloading(false);
        setErrorMessage("網路錯誤");
        setIsErrorAlert(true);
      });
  };
  const handleChangeCouponName = (e) => {
    setCouponName(e.target.value);
  };
  const handleChangeCouponDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeCouponContent = (e) => {
    setCouponContent(e.target.value);
  };
  const handleChangeCouponStartDate = (e) => {
    setCouponStartDate(e.target.value);
  };
  const handleChangCouponEndDate = (e) => {
    setCouponEndDate(e.target.value);
  };
  const numberExpression = /^[0-9]+.?[0-9]*/;
  function printIfCouponNameBlank() {
    if (couponName === "") {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfCouponDesriptionBlank() {
    if (
      !discountContent ||
      numberExpression.test(String(discountContent)) != true
    ) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfCouponStartDateBlank() {
    if (
      couponStartDate === "" ||
      numberExpression.test(String(couponStartDate)) != true
    ) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfCouponEndDateBlank() {
    if (
      couponEndDate === "" ||
      numberExpression.test(String(couponEndDate)) != true
    ) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  let isButtonDisable = true;
  function checkInputIsBlank() {
    if (couponName == null || discountContent === "") {
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
      <form onSubmit={handleSubmit}>
        <div className={styles.container_basicInfo}>
          <div className={styles.container_basicInfo_title}>基本資訊</div>
          <div className={styles.container_basicInfo_couponName}>
            <div className={styles.container_basicInfo_couponName_title}>
              *折扣碼
            </div>
            <input
              className={printIfCouponNameBlank()}
              type="text"
              placeholder={"請輸入"}
              value={couponName}
              onChange={handleChangeCouponName}
            />
          </div>
          <div className={styles.container_basicInfo_discountContent}>
            <div className={styles.container_basicInfo_discountContent_title}>
              折扣簡介
            </div>
            <input
              className={styles.loginContent_inputBar}
              type="text"
              placeholder={"請輸入"}
              value={description}
              onChange={handleChangeCouponDescription}
            />
          </div>
          <div className={styles.container_basicInfo_discountContent}>
            <div className={styles.container_basicInfo_discountContent_title}>
              *優惠金額
            </div>
            <input
              className={printIfCouponDesriptionBlank()}
              type="text"
              placeholder={"請輸入"}
              value={discountContent}
              onChange={handleChangeCouponContent}
            />
          </div>
          <div className={styles.container_basicInfo_discountContent}>
            <div className={styles.container_basicInfo_discountContent_title}>
              開始日期
            </div>
            <input
              className={styles.loginContent_inputBar}
              type="text"
              placeholder={"請輸入"}
              value={couponStartDate}
              onChange={handleChangeCouponStartDate}
            />
          </div>
          <div className={styles.container_basicInfo_discountContent}>
            <div className={styles.container_basicInfo_discountContent_title}>
              結束日期
            </div>
            <input
              className={styles.loginContent_inputBar}
              type="text"
              placeholder={"請輸入"}
              value={couponEndDate}
              onChange={handleChangCouponEndDate}
            />
          </div>
          <div className={styles.container_basicInfo_goodsCategory}></div>
        </div>
        <div className={styles.container_functionKey}>
          <input
            className={checkInputIsBlank()}
            type="submit"
            value="新增"
            disabled={isButtonDisable}
          />
        </div>
      </form>
      {isLoading && <Loading />}
      {isErrorAlert && (
        <Alert
          type={"error"}
          content={errorMessage}
          setIsDisplayState={() => {
            setTimeout(() => {
              console.log("delay");
              setIsErrorAlert(false);
            }, 2000);
          }}
        />
      )}
    </div>
  );
};

export default AddProduct;
