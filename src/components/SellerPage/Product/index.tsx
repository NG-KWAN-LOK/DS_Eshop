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
import * as loginActions from "../../../containers/Login/actions";

import ProductGoodsItem from "./ProductGoodsItem"
import Loading from "../../PopUpLayer/Loading"

interface HeaderProps { }

const Product = () => {
  const history = useHistory();
  const userToken = useSelector((appState: any) => appState.LoginReducer.userData.userToken);
  const [goodsList, getGoodsList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    getGoodsListInfo()
  }, []);
  async function getGoodsListInfo(){
    await sellerApi.getSellerGoodsList(userToken)
      .then((res) => {
        console.log("success")
        console.log(res.data)
        getGoodsList(res.data);
      })
      .catch((err) => {
        console.log("fail")
      });
    setIsloading(false)
  }
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
              return <ProductGoodsItem data={data} />;
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
    </div>
  );
};

export default Product;
