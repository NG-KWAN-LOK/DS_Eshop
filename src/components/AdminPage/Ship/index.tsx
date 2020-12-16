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
import OrderApi from "../../../utils/api/apifetcher/order";
import OrderItem from "./ShipOrderItem"

interface HeaderProps { }

const Ship = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [ordersList, getOrdersList] = useState([]);
  useEffect(() => {
    OrderApi.getOrdersList()
      .then((res) => {
        console.log(res);
        getOrdersList(res);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_goodsItemListContainer}>
          <div className={styles.container_goodsItemListContainer_header}>
            <div className={styles.container_goodsItemListContainer_header_goodsName}>
              商品名稱
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsPrice}>
              <span>賣家應付價格</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_orderStatus}>
              <span>狀態</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_control}>
              <span>操作</span>
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {ordersList.map((data, index) => {
              return <OrderItem ordersData={data} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ship;
