import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";
import GoodsItem from "../GoodsItem"

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

const OrdersCard = ({ ordersData }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  //console.log(ordersData);
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
        <div className={styles.container_topCol_header}>
          <div className={styles.container_topCol_header_titleBox}>
            <div className={styles.container_topCol_header_titleBox_orderID}>訂單編號{ordersData.orderId}</div>
          </div>
          <div className={styles.container_topCol_header_statusBox}>
            <div className={styles.container_topCol_header_statusBox_statusDescritption}>{statusDescription}</div>
            <div className={styles.container_topCol_header_statusBox_status}>{statusWord}</div>
          </div>
        </div>
        <div className={styles.container_topCol_goodsItemListContainer}>
          {ordersData.goodsList.map((data, index) => {
            return <GoodsItem goodsData={data} />;
          })}
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
      </div>
    </div>
  );
};

export default OrdersCard;
