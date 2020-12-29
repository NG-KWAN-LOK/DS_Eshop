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
import couponApi from "../../../utils/api/apifetcher/coupon";

import MemberItem from "./CouponItem";
import Loading from "../../PopUpLayer/Loading";

interface HeaderProps {}

const Coupon = () => {
  const history = useHistory();
  const [couponList, getCouponList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    getCouponListInfo();
  }, []);
  function getCouponListInfo() {
    couponApi
      .getCouponList()
      .then((res) => {
        console.log("success");
        console.log(res);
        getCouponList(res);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("fail");
        setIsloading(false);
      });
  }
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_goodsItemListContainer}>
          <div className={styles.container_goodsItemListContainer_header}>
            <div
              className={
                styles.container_goodsItemListContainer_header_userName
              }
            >
              優惠碼
            </div>
            <div
              className={
                styles.container_goodsItemListContainer_header_customerName
              }
            >
              <span>優惠金額</span>
            </div>
            <div
              className={styles.container_goodsItemListContainer_header_email}
            >
              <span>開始日期</span>
            </div>
            <div
              className={styles.container_goodsItemListContainer_header_address}
            >
              <span>結束日期</span>
            </div>
            <div
              className={
                styles.container_goodsItemListContainer_header_createTime
              }
            >
              <span>建立時間</span>
            </div>
            <div
              className={styles.container_goodsItemListContainer_header_control}
            >
              <span>操作</span>
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {couponList.map((data, index) => {
              return (
                <MemberItem
                  key={index}
                  data={data}
                  getMembereAPI={getCouponListInfo}
                />
              );
            })}
          </div>
        </div>
        {couponList.length == 0 && (
          <div className={styles.container_titleBar_itemEmpty}>
            <div className={styles.container_titleBar_itemEmpty_text}>
              暫無用戶
            </div>
          </div>
        )}
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Coupon;
