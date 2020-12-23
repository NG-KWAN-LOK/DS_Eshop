import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";
import GoodsItem from "../SaleGoodsItem"

import Loading from "../../../PopUpLayer/Loading"
import Confirm from "../../../PopUpLayer/ConfirmAlert"
import Alert from "../../../PopUpLayer/Alert"

const OrdersCard = ({ ordersData, getOrdersAPI }) => {
  console.log(ordersData);
  const [isLoading, setIsloading] = useState(false);
  const [isCancelConfrimAlert, setIsCancelConfrimAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
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
  function cancelOrder() {
    console.log("cancelOrder" + ordersData.orderId)
    setIsloading(true)
    // sellerApi.deleteItem(data.id)
    //   .then((res) => {
    //     console.log("success")
    //     getGoodsAPI();
    //   })
    //   .catch((err) => {
    //     console.log("fail")
    //     setIsErrorAlert(true)
    //     setIsloading(false)
    //   });
    setIsloading(false)
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
          <div className={styles.container_topCol_control_text} onClick={() => setIsCancelConfrimAlert(true)}>刪除</div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isCancelConfrimAlert && <Confirm title={"您確定要刪除此商品?"} content={"商品刪除後，便不能再回復。"} onCancel={() => { setIsCancelConfrimAlert(false) }} onConfirm={() => { cancelOrder(); }} />}
      {isErrorAlert && <Alert type={"error"} content={"失敗"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default OrdersCard;
