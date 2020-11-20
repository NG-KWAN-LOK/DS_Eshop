import React, { useState, useCallback, useEffect } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

//import Header from "../../components/Header/headerComponents/LoginHeader";

import { checkIslogIn } from "../../utils/tools/index";

import Header from "../../components/Header/ShoppingCartHeader";
import ShoppingCartItem from "../../components/ShoppingCart/ShoppingCartItem";
import GoodsApi from "../../utils/api/apifetcher/goods"
interface LoginProps { }

const ShoppingCart = () => {
  const history = useHistory();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const [goodsList, getGoodsList] = useState([]);
  if (!isLogin) {
    var path = "/login";
    history.push(path);
  }
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
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.top_Padding}> </div>
      <div className={styles.pageContainer}>
        <div className={styles.pageContainer_productContainer}>
          <div className={styles._pageContainer_productContainer_productHeader}>
            <div
              className={
                styles._pageContainer_productContainer_productHeader_porductName
              }
            >
              商品
            </div>
            <div
              className={
                styles._pageContainer_productContainer_productHeader_unitPrice
              }
            >
              單價
            </div>
            <div
              className={
                styles._pageContainer_productContainer_productHeader_count
              }
            >
              數量
            </div>
            <div
              className={
                styles._pageContainer_productContainer_productHeader_totalPrice
              }
            >
              總計
            </div>
            <div
              className={
                styles._pageContainer_productContainer_productHeader_action
              }
            >
              操作
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {goodsList.map((data, index) => {
              return <ShoppingCartItem goodsData={data} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
