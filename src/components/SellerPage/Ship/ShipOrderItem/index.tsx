import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";
import GoodsItem from "../ShipGoodsItem"
import OrderApi from "../../../../utils/api/apifetcher/order";

import Loading from "../../../PopUpLayer/Loading"
import Confirm from "../../../PopUpLayer/ConfirmAlert"
import Alert from "../../../PopUpLayer/Alert"

const OrdersCard = ({ ordersData, getOrdersAPI }) => {
  const [setStatusMode, setSetStatusMode] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isSetConfrimAlert, setIsSetConfrimAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  console.log(ordersData);
  let statusWord = "";
  let statusDescription = "";
  function ConvertStatusCode() {
    switch (ordersData.status) {
      case "4":
        statusWord = "已完成";
        statusDescription = "買家收件成功";
        break;
      case "3":
        statusWord = "待收貨";
        statusDescription = "等待買家收貨";
        break;
      case "2":
        statusWord = "待出貨";
        statusDescription = "等待賣家出貨";
        break;
      case "1":
        statusWord = "備貨中";
        statusDescription = "等待賣家備貨";
        break;
      default:
        statusWord = "已取消";
        statusDescription = "訂單已取消";
        break;
    }
  }
  function setIsOrderStatus() {
    console.log(ordersData.orderId, setStatusMode)
    //setIsloading(true)
    // OrderApi.setOrderState(ordersData.orderId, setStatusMode)
    //   .then((res) => {
    //     console.log("success")
    //     getOrdersAPI();
    //     setIsloading(false)
    //   })
    //   .catch((err) => {
    //     console.log("fail")
    //     setIsloading(false)
    //     setIsErrorAlert(true)
    //   });
  }
  function CountTotalPrice() {
    let totalPrice = 0;
    ordersData.goodsList.forEach(goodsData => {
      totalPrice += parseInt(goodsData.price) * parseInt(goodsData.count)
    })
    return totalPrice;
  }
  ConvertStatusCode()
  return (
    <div className={styles.container}>
      <div className={styles.container_topCol}>
        <div className={styles.container_topCol_goodsItemListContainer}>
          {ordersData.goodsList.map((data, index) => {
            return <GoodsItem goodsData={data} />;
          })}
        </div>
        <div className={styles.container_topCol_totalPrice}>
          ${CountTotalPrice()}
        </div>
        <div className={styles.container_topCol_status}>
          {statusWord}
        </div>
        <div className={styles.container_topCol_control}>
          <div className={styles.container_topCol_control_container} >
            <div className={styles.container_topCol_control_text} onClick={() => { setSetStatusMode("1"); setIsSetConfrimAlert(true) }}>設為備貨中</div>
            <div className={styles.container_topCol_control_text} onClick={() => { setSetStatusMode("2"); setIsSetConfrimAlert(true) }}>設為待出貨</div>
            <div className={styles.container_topCol_control_text} onClick={() => { setSetStatusMode("3"); setIsSetConfrimAlert(true) }}>設為待收貨</div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isSetConfrimAlert && <Confirm title={`您確定要將訂單狀態設為${setStatusMode === "1" ? "備貨中" : setStatusMode === "2" ? "待出貨" : setStatusMode === "3" ? "待收貨" : ""}?`} content={"設定後，買家將會看見你所設的訂單狀態。"} onCancel={() => { setIsSetConfrimAlert(false) }} onConfirm={() => { setIsOrderStatus(); setIsSetConfrimAlert(false) }} />}
      {isErrorAlert && <Alert type={"error"} content={"失敗"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default OrdersCard;
