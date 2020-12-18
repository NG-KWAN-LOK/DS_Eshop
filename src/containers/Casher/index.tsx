import React, { useState, useCallback, useEffect } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

//import Header from "../../components/Header/headerComponents/LoginHeader";

import { checkIslogIn } from "../../utils/tools/index";

import Header from "../../components/Header/CasherHeader";
import CasherItem from "../../components/Casher/CasherItem";
import ShoppingCartApi from "../../utils/api/apifetcher/shoppingCart"
import Loading from "../../components/PopUpLayer/Loading"
import Alert from "../../components/PopUpLayer/Alert"

interface LoginProps { }

const ShoppingCart = () => {
  const history = useHistory();
  const userData = useSelector((appState: any) => appState.LoginReducer.userData);
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const [goodsList, getGoodsList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);

  if (!isLogin) {
    var path = "/login";
    history.push(path);
  }
  useEffect(() => {
    setIsloading(true)
    ShoppingCartApi.getShoppingCartList()
      .then((res) => {
        console.log(res.data);
        getGoodsList(res.data);
        setIsloading(false)
      })
      .catch((err) => {
        console.log("error");
        setIsErrorAlert(true)
        setIsloading(false)
      });
  }, []);
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
    var path = "/casher";
    history.push(path);
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
              訂單商品
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
              總價
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {goodsList.map((data, index) => {
              return <CasherItem key={data.shoppingCartID} cartData={data} />;
            })}
          </div>
          <div className={styles.container_cartFooter}>
            <div className={styles.container_cartFooter_shipInfo}>
              <div className={styles.container_cartFooter_shipInfo_title}>
                運送資料
              </div>
              <div className={styles.container_cartFooter_shipInfo_customerName}>
                <div className={styles.container_cartFooter_shipInfo_customerName_title}>
                  收件人名稱
                </div>
                <div className={styles.container_cartFooter_shipInfo_customerName_text}>
                  {userData.customerName}
                </div>
              </div>
              <div className={styles.container_cartFooter_shipInfo_customerAddress}>
                <div className={styles.container_cartFooter_shipInfo_customerAddress_title}>
                  收件地址
                </div>
                <div className={styles.container_cartFooter_shipInfo_customerAddress_text}>
                  {userData.address}
                </div>
              </div>
              <div className={styles.container_cartFooter_shipInfo_customerPhoneNumber}>
                <div className={styles.container_cartFooter_shipInfo_customerPhoneNumber_title}>
                  手機號碼
                </div>
                <div className={styles.container_cartFooter_shipInfo_customerPhoneNumber_text}>
                  {userData.phoneNumber}
                </div>
              </div>
            </div>
            <div className={styles.container_cartFooter_row1}>
              <div className={styles.container_cartFooter_row1_totalGoods}>
                小計 ({countTotalGoods()})
              </div>
              <div className={styles.container_cartFooter_row1_totalPrice}>
                ${countTotalPrice()}
              </div>
              <div className={styles.container_cartFooter_row1_toCasherBtn} onClick={routeChangeToCasher}>
                下訂單
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
