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

import sellerApi from "../../../utils/api/apifetcher/seller";
import imgurApi from "../../../utils/api/apifetcher/imgur";
import Loading from "../../PopUpLayer/Loading";
import Alert from "../../PopUpLayer/Alert";
import styles from "./styles.scss";

const ProductEditGoods = () => {
  const history = useHistory();
  const { goodsID: id } = useParams({ keys: ["goodsID"] });
  const [goodsName, setGoodsName] = useState("");
  const [goodsDesription, setGoodsDesription] = useState();
  const [goodsCetogory, setGoodsCetogory] = useState("請選擇");
  const [goodsPrice, setGoodsPrice] = useState();
  const [goodsStock, setGoodsStock] = useState();
  const [goodsImg, setGoodsImg] = useState();
  const [goodsSale, setGoodsSale] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("網路錯誤");
  const [selectedFile, setSelectedFile] = useState(null);
  async function getGoodInfo() {
    await sellerApi
      .getItemInfo(id)
      .then((res) => {
        console.log("success");
        console.log(res.data);
        setGoodsName(res.data.name);
        setGoodsDesription(res.data.description);
        setGoodsPrice(res.data.price);
        setGoodsStock(res.data.stock);
        setGoodsImg(res.data.imgURL);
        setGoodsSale(res.data.sales);
        setGoodsCetogory(
          res.data.category !== "" ? res.data.category : "未選擇"
        );
      })
      .catch((err) => {
        console.log("fail");
      });
    setIsloading(false);
  }
  if (goodsName === "") {
    getGoodInfo();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      id,
      goodsName,
      goodsDesription,
      goodsImg,
      goodsPrice,
      goodsStock,
      goodsSale
    );
    setIsloading(true);
    let tempGoodsImg = null;
    setIsloading(true);
    if (selectedFile != null) {
      await imgurApi
        .uploadImage(selectedFile)
        .then((res) => {
          console.log("success");
          setGoodsImg(res.data.data.link);
          tempGoodsImg = res.data.data.link;
          console.log(res.data.data.link);
          console.log(res);
        })
        .catch((err) => {
          console.log("fail");
          setIsloading(false);
          setErrorMessage("圖片伺服器錯誤");
          setIsErrorAlert(true);
        });
    }
    await sellerApi
      .updateItemInfo(
        id,
        goodsName,
        goodsDesription,
        tempGoodsImg != null ? tempGoodsImg : goodsImg,
        goodsPrice,
        goodsStock,
        goodsSale,
        goodsCetogory
      )
      .then((res) => {
        console.log("success");
        history.push("/seller/product");
      })
      .catch((err) => {
        console.log("fail");
        setIsloading(false);
        setErrorMessage("網路錯誤");
        setIsErrorAlert(true);
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
    if (
      goodsPrice === "" ||
      numberExpression.test(String(goodsPrice)) != true
    ) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIfGoodsStockBlank() {
    if (
      goodsStock === "" ||
      numberExpression.test(String(goodsStock)) != true
    ) {
      return `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`;
    } else {
      return `${styles["loginContent_inputBar"]}`;
    }
  }
  function printIsGoodsImgURL() {
    if (
      goodsImg != null &&
      goodsImg != "" &&
      urlExpression.test(String(goodsImg)) != true
    ) {
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
      (goodsImg != "" && urlExpression.test(String(goodsImg)) != true) ||
      goodsCetogory === "請選擇"
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
          <div className={styles.container_basicInfo_title}>基本資訊</div>
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
          <div className={styles.container_basicInfo_goodsCategory}>
            <div className={styles.container_basicInfo_goodsCategory_title}>
              *類別
            </div>
            <div className={styles.container_basicInfo_goodsCategory_dropList}>
              <div
                className={
                  styles.container_basicInfo_goodsCategory_dropList_subtitle
                }
              >
                <span
                  className={
                    styles.container_basicInfo_goodsCategory_dropList_text_notSelect
                  }
                >
                  {goodsCetogory}
                </span>
                <span
                  className={
                    styles.container_basicInfo_goodsCategory_dropList_arrow
                  }
                ></span>
              </div>
              <div
                className={
                  styles.container_basicInfo_goodsCategory_dropList_under
                }
              >
                {categoryList.map((data, index) => {
                  return (
                    <div
                      className={
                        styles.container_basicInfo_goodsCategory_dropList_under_subtitle
                      }
                      onClick={() => setGoodsCetogory(data.name)}
                    >
                      <span
                        className={
                          goodsCetogory == data.name
                            ? styles.container_basicInfo_goodsCategory_dropList_under_text_isSelect
                            : styles.container_basicInfo_goodsCategory_dropList_under_text
                        }
                      >
                        {data.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_sellInfo}>
          <div className={styles.container_sellInfo_title}>媒體管理</div>
          <div className={styles.container_basicInfo_goodsImg}>
            <div className={styles.container_basicInfo_goodsImg_title}>
              商品圖片
            </div>
            <input
              className={printIsGoodsImgURL()}
              type="text"
              placeholder={
                selectedFile ? "使用已選擇圖片上傳" : "請輸入圖片URL"
              }
              value={selectedFile ? "使用已選擇圖片上傳" : goodsImg}
              onChange={handleChangeGoodsImg}
              disabled={selectedFile}
            />
          </div>
          <div className={styles.container_basicInfo_goodsImg_file}>
            <div className={styles.container_basicInfo_goodsImg_title}></div>
            <input
              className={styles.container_basicInfo_goodsImg_Btn}
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
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
          <div className={styles.container_sellInfo_title}>銷售資訊</div>
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
          <Link
            to={{ pathname: "/seller/product" }}
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
