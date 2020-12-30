import React, { useCallback, useRef, useState } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";

import PATH from "Utils/pathConst";
import useParams from "Customhooks/useParams";
import { categoryList } from "../../../utils/constants";

import adminApi from "../../../utils/api/apifetcher/admin";
import couponApi from "../../../utils/api/apifetcher/coupon";
import Loading from "../../PopUpLayer/Loading";
import Alert from "../../PopUpLayer/Alert";
import styles from "./styles.scss";

const ProductEditGoods = () => {
  const history = useHistory();
  const { couponName: oldCouponName } = useParams({ keys: ["couponName"] });
  const [couponID, setCouponID] = useState();
  const [couponName, setCouponName] = useState();
  const [description, setDescription] = useState();
  const [discountContent, setCouponContent] = useState();
  const [couponStartDate, setCouponStartDate] = useState();
  const [couponEndDate, setCouponEndDate] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("網路錯誤");
  async function getGoodInfo() {
    console.log(oldCouponName)
    await couponApi
      .getCouponInfoByName(oldCouponName)
      .then((res) => {
        console.log("success");
        console.log(res.data);
        setCouponID(res.data.id);
        setCouponName(res.data.content);
        setDescription(res.data.description);
        setCouponContent(res.data.discount_rate);
        setCouponStartDate(res.data.startdate);
        setCouponEndDate(res.data.enddate);
      })
      .catch((err) => {
        console.log("fail");
      });
    setIsloading(false);
  }
  if (!couponID) {
    getGoodInfo();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(couponName, discountContent, couponStartDate, couponEndDate);
    setIsloading(true);
    await adminApi
      .updateCoupon(
        oldCouponName,
        couponName,
        description,
        discountContent,
        couponStartDate,
        couponEndDate
      )
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
  const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
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
          <div className={styles.container_basicInfo_couponName}>
            <div className={styles.container_basicInfo_couponName_title}>
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
          <Link
            to={{ pathname: "/admin/coupon" }}
            className={styles.loginContent_cancelBtn}
          >
            取消
          </Link>
          <input
            className={checkInputIsBlank()}
            type="submit"
            value="更新"
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

export default ProductEditGoods;
