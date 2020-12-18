import React, { useState, useCallback, useEffect } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

//import Header from "../../components/Header/headerComponents/LoginHeader";

import { checkIslogIn } from "../../utils/tools/index";

import Header from "../../components/Header/ShoppingCartHeader";
import Loading from "../../components/PopUpLayer/Loading"
import Alert from "../../components/PopUpLayer/Alert"

import ShoppingCartItem from "../../components/ShoppingCart/ShoppingCartItem";
import ShoppingCartApi from "../../utils/api/apifetcher/shoppingCart"
interface LoginProps { }

const ShoppingCart = () => {
  const history = useHistory();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const [goodsList, getGoodsList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);

  if (!isLogin) {
    var path = "/login";
    history.push(path);
  }
  useEffect(() => {
    getShoppingCartList();
  }, []);
  async function getShoppingCartList(){
    setIsloading(true)
    await ShoppingCartApi.getShoppingCartList()
      .then((res) => {
        getGoodsList(res.data);
      })
      .catch((err) => {
        setIsErrorAlert(true)
        console.log("error");
      });
    setIsloading(false)
  }
  console.log(goodsList)
  function countTotalGoods() {
    var totalGoods = 0;
    goodsList.forEach(sellerData => {
      sellerData.goodsList.forEach(goodsData => {
        totalGoods += parseInt(goodsData.count)
      })
    })
    return totalGoods
  }
  function countTotalPrice() {
    var totalPrice = 0;
    goodsList.forEach(sellerData => {
      var sellerTotalPrice = 0;
      sellerData.goodsList.forEach(goodsData => {
        sellerTotalPrice += parseInt(goodsData.count) * parseInt(goodsData.price)
      })
      totalPrice += sellerTotalPrice
    })
    return totalPrice
  }
  const routeChangeToCasher = useCallback(() => {
    var path = "/Casher";
    history.push(path);
  }, []);
  console.log(goodsList)
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
              return <ShoppingCartItem key={data.sellerUserName} cartData={data} getGoodsAPI={getShoppingCartList}/>;
            })}
          </div>
          <div className={styles.container_cartFooter}>
            <div className={styles.container_cartFooter_row1}>
              <div className={styles.container_cartFooter_row1_totalGoods}>
                小計 ({countTotalGoods()})
              </div>
              <div className={styles.container_cartFooter_row1_totalPrice}>
                ${countTotalPrice()}
              </div>
              <div className={styles.container_cartFooter_row1_toCasherBtn} onClick={routeChangeToCasher}>
                去買單
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && <Alert type={"error"} content={"網路失敗"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default ShoppingCart;
