import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";
import GoodsItem from "../SaleGoodsItem";

import GoodsApi from "../../../../utils/api/apifetcher/goods";

import Loading from "../../../PopUpLayer/Loading";
import Confirm from "../../../PopUpLayer/ConfirmAlert";
import Alert from "../../../PopUpLayer/Alert";

const OrdersCard = ({ ordersData, getOrdersAPI }) => {
  console.log(ordersData);
  const [isLoading, setIsloading] = useState(false);
  const [isCancelConfrimAlert, setIsCancelConfrimAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [goodsList, getGoodsList] = useState([]);
  let statusWord = "";
  let statusDescription = "";
  useEffect(() => {
    getItemInfo();
  }, []);
  async function getItemInfo() {
    var newOrderData = [];
    await ordersData.goodsList.map((data, index) => {
      console.log(data);
      var newData = data;
      // GoodsApi.getItemInfo(data.item_id)
      //   .then((res) => {
      //     console.log(res.data);
      //     newData = { data, ...res.data };
      //     newOrderData.push(newData);
      //     getGoodsList(newOrderData);
      //   })
      //   .catch((err) => {
      //     console.log("fail");
      //     setIsloading(false);
      //     setIsErrorAlert(true);
      //   });
      Promise.all([
        GoodsApi.getItemInfo(data.item_id)
          .then((res) => {
            console.log(res.data);
            newData = { data, ...res.data };
            newOrderData.push(newData);
            return newOrderData;
          })
          .catch((err) => {
            console.log("fail");
            setIsloading(false);
            setIsErrorAlert(true);
          }),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          console.log(data);
          getGoodsList(responses);
          return responses;
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });
    });
  }
  function ConvertStatusCode() {
    switch (ordersData.status) {
      case 4:
        statusWord = "已完成";
        statusDescription = "買家收件成功";
        break;
      case 3:
        statusWord = "待收貨";
        statusDescription = "等待買家收貨";
        break;
      case 2:
        statusWord = "待出貨";
        statusDescription = "等待賣家出貨";
        break;
      case 1:
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
    console.log("cancelOrder" + ordersData.orderId);
    setIsloading(true);
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
    setIsloading(false);
  }
  function CountTotalPrice() {
    let totalPrice = 0;
    goodsList.map((goodsData) => {
      //console.log(goodsData);
      goodsData.map((data) => {
        //console.log(data);
        totalPrice += parseInt(data.price) * parseInt(data.data.items_quantity);
      });
    });
    return totalPrice;
  }
  ConvertStatusCode();
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
        <div className={styles.container_topCol_status}>{statusWord}</div>
        <div className={styles.container_topCol_control}>
          <div
            className={styles.container_topCol_control_text}
            onClick={() => setIsCancelConfrimAlert(true)}
          >
            取消訂單
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isCancelConfrimAlert && (
        <Confirm
          title={"您確定要取消此訂單?"}
          content={"訂單取消後，便不能再回復，貨款隨即退回買家"}
          onCancel={() => {
            setIsCancelConfrimAlert(false);
          }}
          onConfirm={() => {
            cancelOrder();
          }}
        />
      )}
      {isErrorAlert && (
        <Alert
          type={"error"}
          content={"失敗"}
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

export default OrdersCard;
