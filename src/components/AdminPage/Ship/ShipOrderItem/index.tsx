import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";
import GoodsItem from "../ShipGoodsItem";

import GoodsApi from "../../../../utils/api/apifetcher/goods";
import OrderApi from "../../../../utils/api/apifetcher/order";

import Loading from "../../../PopUpLayer/Loading";
import Confirm from "../../../PopUpLayer/ConfirmAlert";
import Alert from "../../../PopUpLayer/Alert";

// const ArtistLink = ({ audioData, customClass = undefined, children }) => {
//   {
//     return audioData.artist.length === 1 ? (
//       <Link
//         to={PATH.getArtistLink(audioData.artist[0].id)}
//         className={customClass}
//       >
//         {children}
//       </Link>
//     ) : (
//         <AudioLink id={audioData.id} customClass={customClass}>
//           {children}
//         </AudioLink>
//       );
//   }
// };

const OrdersCard = ({ ordersData, getOrdersAPI }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  console.log(ordersData);
  const [isLoading, setIsloading] = useState(false);
  const [setStatusMode, setSetStatusMode] = useState(0);
  const [isSetConfrimAlert, setIsSetConfrimAlert] = useState(false);
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
  function setIsOrderStatus() {
    console.log(ordersData.orderId, setStatusMode);
    setIsloading(true);
    OrderApi.setOrderState(ordersData.orderId, setStatusMode)
      .then((res) => {
        console.log("success");
        getOrdersAPI();
        setIsloading(false);
      })
      .catch((err) => {
        console.log("fail");
        setIsloading(false);
        setIsErrorAlert(true);
      });
  }
  ConvertStatusCode();
  return (
    <div className={styles.container}>
      <div className={styles.container_topCol_header_titleBox}>
        <div className={styles.container_topCol_header_titleBox_orderID}>
          訂單編號：{ordersData.orderId}
        </div>
      </div>
      <div className={styles.container_topCol_header_titleBox_footer}>
        <div className={styles.container_topCol_header_titleBox_footer_title}>
          收件人：{ordersData.customerName}
        </div>
        <div className={styles.container_topCol_header_titleBox_footer_title}>
          收件地址：{ordersData.customerAddress}
        </div>
        <div className={styles.container_topCol_header_titleBox_footer_title}>
          收件人電話：{ordersData.customerPhoneNumber}
        </div>
      </div>
      <div className={styles.container_topCol}>
        <div className={styles.container_topCol_goodsItemListContainer}>
          {ordersData.goodsList.map((data, index) => {
            return <GoodsItem key={index} goodsData={data} />;
          })}
        </div>
        <div className={styles.container_topCol_totalPrice}>
          ${CountTotalPrice()}
        </div>
        <div className={styles.container_topCol_status}>{statusWord}</div>
        <div className={styles.container_topCol_control}>
          <div className={styles.container_topCol_control_container}>
            <div
              className={styles.container_topCol_control_text}
              onClick={() => {
                setSetStatusMode(0);
                setIsSetConfrimAlert(true);
              }}
            >
              取消訂單
            </div>
            <div
              className={styles.container_topCol_control_text}
              onClick={() => {
                setSetStatusMode(1);
                setIsSetConfrimAlert(true);
              }}
            >
              設為備貨中
            </div>
            <div
              className={styles.container_topCol_control_text}
              onClick={() => {
                setSetStatusMode(2);
                setIsSetConfrimAlert(true);
              }}
            >
              設為待出貨
            </div>
            <div
              className={styles.container_topCol_control_text}
              onClick={() => {
                setSetStatusMode(3);
                setIsSetConfrimAlert(true);
              }}
            >
              設為待收貨
            </div>
            <div
              className={styles.container_topCol_control_text}
              onClick={() => {
                setSetStatusMode(4);
                setIsSetConfrimAlert(true);
              }}
            >
              設為已完成
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isSetConfrimAlert && (
        <Confirm
          title={`您確定要將訂單狀態設為${
            setStatusMode == 1
              ? "備貨中"
              : setStatusMode == 2
              ? "待出貨"
              : setStatusMode == 3
              ? "待收貨"
              : setStatusMode == 4
              ? "已完成"
              : "取消"
          }?`}
          content={"設定後，買家將會看見你所設的訂單狀態。"}
          onCancel={() => {
            setIsSetConfrimAlert(false);
          }}
          onConfirm={() => {
            setIsOrderStatus();
            setIsSetConfrimAlert(false);
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
