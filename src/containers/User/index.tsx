import React, { useState, useCallback } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

import Header from "../../components/Header/MainHeader";
import Profile from "../../components/UserPage/Profile";
import ChangePassWord from "../../components/UserPage/ChangePassWord";
import PurchaseAll from "../../components/UserPage/PurchaseAll";
interface SellerProps { }

const ProfilePage = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  if (!isLogin) {
    var path = "/login";
    history.push(path);
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.menuNav}>
          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>
              我的帳戶
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/user/profile"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  個人檔案
               </div>
              </div>
              </Link>
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/user/changePassWord"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  更改密碼
               </div>
              </div>
              </Link>
            </div>
          </div>

          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>
              購買清單
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/user/purchaseAll"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  全部
               </div>
              </div>
              </Link>
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/user/purchaseWaitOut"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  待出貨
               </div>
              </div>
              </Link>
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/user/purchaseWaitRecive"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  待收貨
               </div>
              </div>
              </Link>
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/user/purchaseIsFinish"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  已完成
               </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_block}>
            <Route exact path={"/user"} component={Profile} />
            <Route path={"/user/profile"} component={Profile} />
            <Route path={"/user/changePassWord"} component={ChangePassWord} />
            <Route path={"/user/purchaseAll"} component={PurchaseAll} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
