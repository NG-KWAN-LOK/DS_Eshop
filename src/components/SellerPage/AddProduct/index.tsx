import React, { useCallback, useRef, useState } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";

import styles from "./styles.scss";

interface HeaderProps { }

const AddProduct = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [goodsName, setGoodsName] = useState();
  const [goodsDesription, setGoodsDesription] = useState();
  const [goodsPrice, setGoodsPrice] = useState();

  const handleSubmit = (event) => {
    console.log(goodsName, goodsDesription, goodsPrice);
    event.preventDefault();
  };
  const handleChangeGoodsName = (e) => {
    setGoodsName(e.target.value);
  };
  const handleChangeGoodsDesription = (e) => {
    setGoodsDesription(e.target.value);
  };
  const handleChangeGoodsPrice = (e) => {
    setGoodsPrice(e.target.value);
  };
  const goodsPriceExpression = /^\d{10}$/;
  function printIfGoodsNameBlank() {
    if (goodsName === "") {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfGoodsDesriptionBlank() {
    if (goodsDesription === "") {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfGoodsPriceBlank() {
    if (goodsPrice === "" ||
      goodsPriceExpression.test(String(goodsPrice)) != true) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.container_basicInfo}>
          <div className={styles.container_basicInfo_title}>
            基本資訊
        </div>
          <div className={styles.container_basicInfo_goodsName}>
            <div className={styles.container_basicInfo_goodsName_title}>
              *商品名稱
            </div>
            <input
              className={printIfGoodsNameBlank()}
              type="text"
              placeholder={"商品名稱"}
              value={goodsName}
              onChange={handleChangeGoodsName}
            />
          </div>
          <div className={styles.container_basicInfo_goodsDesription}>
            <div className={styles.container_basicInfo_goodsDesription_title}>
              *商品描述
            </div>
            <input
              className={printIfGoodsDesriptionBlank()}
              type="text"
              placeholder={"商品描述"}
              value={goodsDesription}
              onChange={handleChangeGoodsDesription}
            />
          </div>
          <div className={styles.container_basicInfo_goodsImg}>
            <div className={styles.container_basicInfo_goodsImg_title}>
              商品圖片
          </div>
          </div>
        </div>
        <div className={styles.container_sellInfo}>
          <div className={styles.container_sellInfo_title}>
            銷售資訊
        </div>
          <div className={styles.container_sellInfo_goodsPrice}>
            <div className={styles.container_sellInfo_goodsPrice_title}>
              *價格
              <input
                className={printIfGoodsPriceBlank()}
                type="text"
                placeholder={"價格"}
                value={goodsPrice}
                onChange={handleChangeGoodsPrice}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
