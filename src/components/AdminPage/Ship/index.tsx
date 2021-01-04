import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";

import styles from "./styles.scss";
import AdminApi from "../../../utils/api/apifetcher/admin";
import OrderItem from "./ShipOrderItem";

import Loading from "../../PopUpLayer/Loading";
import Alert from "../../PopUpLayer/Alert";

interface HeaderProps {}

const Ship = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [ordersList, getOrdersList] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  useEffect(() => {
    getOrdersListInfo();
  }, []);
  function getOrdersListInfo() {
    AdminApi.getOrdersList()
      .then((res) => {
        //console.log(res.data);
        const newData = res.data;
        getOrdersList(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("fail");
        setIsloading(false);
        setIsErrorAlert(true);
      });
  }
  console.log(ordersList);
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_goodsItemListContainer}>
          <div className={styles.container_goodsItemListContainer_header}>
            <div
              className={
                styles.container_goodsItemListContainer_header_goodsName
              }
            >
              商品名稱
            </div>
            <div
              className={
                styles.container_goodsItemListContainer_header_goodsPrice
              }
            >
              <span>賣家應付價格</span>
            </div>
            <div
              className={
                styles.container_goodsItemListContainer_header_orderStatus
              }
            >
              <span>狀態</span>
            </div>
            <div
              className={styles.container_goodsItemListContainer_header_control}
            >
              <span>操作</span>
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {ordersList && (
              <OrderItem
                ordersData={ordersList}
                getOrdersAPI={getOrdersListInfo}
              />
            )}
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && (
        <Alert
          type={"error"}
          content={"網路錯誤"}
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

export default Ship;
