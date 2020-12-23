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
import OrderItem from "../UserOrderPage/OrderItem"
import OrderApi from "../../../utils/api/apifetcher/order";

import Loading from "../../PopUpLayer/Loading"
import Alert from "../../PopUpLayer/Alert"

interface HeaderProps { }

const PurchaseAll = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const username = useSelector((appState: any) => appState.LoginReducer.userData.userName);
  const [ordersList, getOrdersList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  //const goodsCount = 0;
  useEffect(() => {
    getOrdersListInfo()
  }, []);
  function getOrdersListInfo() {
    OrderApi.getOrdersList()
      .then((res) => {
        console.log(res);
        const newData = res
        getOrdersList(res);
        setIsloading(false)
      })
      .catch((err) => {
        console.log("fail")
        setIsloading(false)
        setIsErrorAlert(true)
      });
  }
  return (
    <div className={styles.container}>
      <div className={styles.container_ordersItemListContainer_item}>
        {ordersList.map((data, index) => {
          return <OrderItem ordersData={data} getOrdersAPI={getOrdersListInfo} />;
        })}
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && <Alert type={"error"} content={"網路錯誤"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default PurchaseAll;
