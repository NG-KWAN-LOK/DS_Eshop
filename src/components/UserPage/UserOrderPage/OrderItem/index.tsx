import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";
import GoodsItem from "../GoodsItem";
import GoodsApi from "../../../../utils/api/apifetcher/goods";
import OrderApi from "../../../../utils/api/apifetcher/order";
import ShoppingCartApi from "../../../../utils/api/apifetcher/shoppingCart";

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
  //console.log(ordersData);
  const [setStatusMode, setSetStatusMode] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [isSetConfrimAlert, setIsSetConfrimAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
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
  console.log("newData", goodsList);
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
  function buyAgain() {
    console.log("buyAgain");
    goodsList.map((goodsData) => {
      //console.log(goodsData);
      goodsData.map((data) => {
        console.log(data.id, data.data.items_quantity);
        ShoppingCartApi.newItem(data.id, data.data.items_quantity.toString())
          .then((res) => {
            console.log("success");
            setIsloading(false);
            setIsSuccessAlert(true);
            return true;
          })
          .catch((err) => {
            console.log("error");
            setIsloading(false);
            setIsErrorAlert(true);
            return false;
          });
      });
    });
  }
  ConvertStatusCode();
  //console.log(ordersData.goodsList);
  return (
    <div className={styles.container}>
      <div className={styles.container_topCol}>
        <div className={styles.container_topCol_header}>
          <div className={styles.container_topCol_header_titleBox}>
            <div className={styles.container_topCol_header_titleBox_orderID}>
              訂單編號：{ordersData.orderId}
            </div>
          </div>
          <div className={styles.container_topCol_header_statusBox}>
            <div
              className={
                styles.container_topCol_header_statusBox_statusDescritption
              }
            >
              {statusDescription}
            </div>
            <div className={styles.container_topCol_header_statusBox_status}>
              {statusWord}
            </div>
          </div>
        </div>
        <div className={styles.container_topCol_goodsItemListContainer}>
          {
            // goodsList.map((goodsData) => {
            //   //console.log(goodsData);
            //   goodsData.map((data, index) => {
            //     console.log(data);
            //     return <GoodsItem key={index} goodsData={data} />;
            //   });
            // })
            ordersData.goodsList.map((data, index) => {
              return <GoodsItem key={index} goodsData={data} />;
            })
          }
        </div>
      </div>
      <div className={styles.container_bottomCol}>
        <div className={styles.container_bottomCol_totalPriceContainer}>
          <div className={styles.container_bottomCol_totalPriceContainer_title}>
            訂單金額:
          </div>
          <div className={styles.container_bottomCol_totalPriceContainer_price}>
            ${CountTotalPrice()}
          </div>
        </div>
        <div className={styles.container_bottomCol_optionContainer}>
          {/* {ordersData.status !== "4" && <div className={styles.loginContent_submitBtn} onClick={confirmRecieved}> 確認收貨</div>} */}
          {ordersData.status !== 4 && ordersData.status !== 0 && (
            <div
              className={styles.loginContent_submitBtn}
              onClick={() => {
                setSetStatusMode(4);
                setIsSetConfrimAlert(true);
              }}
            >
              確認收貨
            </div>
          )}
          {ordersData.status == 4 && (
            <div className={styles.loginContent_submitBtn} onClick={buyAgain}>
              再買一次
            </div>
          )}
        </div>
      </div>
      {isLoading && <Loading />}
      {isSetConfrimAlert && (
        <Confirm
          title={`您確定${setStatusMode == 4 ? "已收到貨件" : ""}?`}
          content={"請確保您確實收到貨品，確定後您的貨款將會自動匯到賣家。"}
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
      {isSuccessAlert && (
        <Alert
          type={"success"}
          content={"商品已加入購物車"}
          setIsDisplayState={() => {
            setTimeout(() => {
              console.log("delay");
              setIsSuccessAlert(false);
            }, 2000);
          }}
        />
      )}
    </div>
  );
};

export default OrdersCard;
