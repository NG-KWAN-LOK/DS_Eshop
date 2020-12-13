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

import sellerApi from "../../../utils/api/apifetcher/seller"
import Loading from "../../PopUpLayer/Loading"

interface HeaderProps { }

const AddProduct = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [goodsName, setGoodsName] = useState();
  const [goodsDesription, setGoodsDesription] = useState();
  const [goodsPrice, setGoodsPrice] = useState();
  const [goodsStock, setGoodsStock] = useState();
  const [goodsImg, setGoodsImg] = useState();
  const [isLoading, setIsloading] = useState(false);


  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(goodsName, goodsDesription, goodsImg, goodsPrice, goodsStock);
    setIsloading(true)
    await sellerApi.newItem(goodsName, goodsDesription, goodsImg, goodsPrice, goodsStock)
      .then((res) => {
        console.log("success")
        history.push("/seller/product")
      })
      .catch((err) => {
        console.log("fail")
        setIsloading(false)
      });
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
  const handleChangeGoodsStock = (e) => {
    setGoodsStock(e.target.value);
  };
  const handleChangeGoodsImg = (e) => {
    setGoodsImg(e.target.value);
  };
  const numberExpression = /^[0-9]+.?[0-9]*/;
  const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
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
      numberExpression.test(String(goodsPrice)) != true) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfGoodsStockBlank() {
    if (goodsStock === "" ||
      numberExpression.test(String(goodsStock)) != true) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIsGoodsImgURL() {
    if (goodsImg != null && goodsImg != "" && urlExpression.test(String(goodsImg)) != true) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  let isButtonDisable = true;
  function checkInputIsBlank() {
    if (
      goodsName == null ||
      goodsPrice == null ||
      goodsDesription === "" ||
      goodsStock == null ||
      numberExpression.test(String(goodsPrice)) != true ||
      numberExpression.test(String(goodsStock)) != true ||
      (goodsImg != "" &&
        urlExpression.test(String(goodsImg)) != true)
    ) {
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
              placeholder={"請輸入"}
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
              placeholder={"請輸入"}
              value={goodsDesription}
              onChange={handleChangeGoodsDesription}
            />
          </div>
          <div className={styles.container_basicInfo_goodsImg}>
            <div className={styles.container_basicInfo_goodsImg_title}>
              商品圖片
            </div>
            <input
              className={printIsGoodsImgURL()}
              type="text"
              placeholder={"請輸入圖片URL"}
              value={goodsImg}
              onChange={handleChangeGoodsImg}
            />
          </div>
          <div className={styles.container_basicInfo_imgPreview}>
            <div className={styles.container_basicInfo_imgPreview_title}>
              商品圖片預覽
            </div>
            <div className={styles.container_basicInfo_goodsImg_imgPreview}>
              <img
                className={styles.container_basicInfo_goodsImg_imgPreview_img}
                src={goodsImg}
              />
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
            </div>
            <input
              className={printIfGoodsPriceBlank()}
              type="text"
              placeholder={"請輸入"}
              value={goodsPrice}
              onChange={handleChangeGoodsPrice}
            />
          </div>
          <div className={styles.container_sellInfo_goodsStock}>
            <div className={styles.container_sellInfo_goodsStock_title}>
              *存庫數量
            </div>
            <input
              className={printIfGoodsStockBlank()}
              type="text"
              placeholder={"請輸入"}
              value={goodsStock}
              onChange={handleChangeGoodsStock}
            />
          </div>
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
    </div>
  );
};

export default AddProduct;
