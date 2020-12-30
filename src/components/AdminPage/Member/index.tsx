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
import adminApi from "../../../utils/api/apifetcher/admin"

import MemberItem from "./MemberItem"
import Loading from "../../PopUpLayer/Loading"

interface HeaderProps { }

const Product = () => {
  const history = useHistory();
  const [memberList, getMemberList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    getMemberListInfo()
  }, []);
  function getMemberListInfo() {
    adminApi.getMemberList()
      .then((res) => {
        console.log("success")
        console.log(res.data.memberList)
        getMemberList(res.data.memberList);
        setIsloading(false)
      })
      .catch((err) => {
        console.log("fail")
        setIsloading(false)
      });

  }
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_goodsItemListContainer}>
          <div className={styles.container_goodsItemListContainer_header}>
            <div className={styles.container_goodsItemListContainer_header_userName}>
              帳戶名稱
            </div>
            <div className={styles.container_goodsItemListContainer_header_customerName}>
              <span>姓名</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_phoneNumber}>
              <span>手機號碼</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_email}>
              <span>電郵地址</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_address}>
              <span>地址</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_createTime}>
              <span>建立時間</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_control}>
              <span>操作</span>
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {memberList.map((data, index) => {
              return <MemberItem key={data.id} data={data} getMembereAPI={getMemberListInfo} />;
            })}
          </div>
        </div>
        {memberList.length == 0 &&
          <div className={styles.container_titleBar_itemEmpty}>
            <div className={styles.container_titleBar_itemEmpty_text}>
              暫無用戶
            </div>
          </div>}
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Product;
