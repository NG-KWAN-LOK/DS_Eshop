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
import GoodsApi from "../../../utils/api/apifetcher/order";
import OrderApi from "../../../utils/api/apifetcher/order";


interface HeaderProps { }

const Product = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const username = useSelector((appState: any) => appState.LoginReducer.userData.userName);
  const [enterPassWord, setenterPassWord] = useState();
  const [confirmPassWord, setconfirmPassWord] = useState();
  const [ordersList, getOrdersList] = useState([]);
  //const goodsCount = 0;
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
      <div className={styles.container_ordersItemListContainer_item}>
        {ordersList.map((data, index) => {
          return <OrderItem ordersData={data} />;
        })}
      </div>
    </div>
  );
};

export default Product;
