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
import sellerApi from "../../../utils/api/apifetcher/seller"

import ProductGoodsItem from "../Product/ProductGoodsItem"
import Loading from "../../PopUpLayer/Loading"
import Alert from "../../PopUpLayer/Alert"


interface HeaderProps { }

const Product = () => {
  const history = useHistory();
  const [goodsList, getGoodsList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  useEffect(() => {
    getGoodsListInfo()
  }, []);
  function getGoodsListInfo(){
    sellerApi.getItemsbyIsDisplay("true")
      .then((res) => {
        console.log("get goods List success")
        const newData = res.data
        getGoodsList(res.data);
        setIsloading(false)
      })
      .catch((err) => {
        console.log("fail")
        setIsloading(false)
        setIsErrorAlert(true)
      });
  }
  console.log(goodsList)
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_titleBar_titleContent}>
          {goodsList.length}件商品
        </div>
        <div className={styles.container_goodsItemListContainer}>
          <div className={styles.container_goodsItemListContainer_header}>
            <div className={styles.container_goodsItemListContainer_header_goodsName}>
              商品名稱
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsPrice}>
              <span>價格</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsStock}>
              <span>商品數量</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsPrice}>
              <span>操作</span>
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {goodsList.map((data, index) => {
              return <ProductGoodsItem key={data.id} data={data} getGoodsAPI={getGoodsListInfo} />;
            })}
          </div>
        </div>
        {goodsList.length == 0 && 
          <div className={styles.container_titleBar_itemEmpty}>
            <div className={styles.container_titleBar_itemEmpty_text}>
            您沒有商品!
            </div>
          </div>}
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && <Alert type={"error"} content={"網路錯誤"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default Product;
