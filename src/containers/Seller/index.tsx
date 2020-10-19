import React, { useState, useCallback } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

import SellerHeader from "../../components/Header/SellerHeader";
import Product from "../../components/SellerPage/Product";
interface SellerProps { }

const Seller = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  if (!isLogin) {
    var path = "/login";
    history.push(path);
  }

  return (
    <div className={styles.container}>
      <SellerHeader />
      <div className={styles.top_Padding}>
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.menuNav}>
          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>
              物流中心
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/seller/ship"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  查看物流
               </div>
              </div>
              </Link>
            </div>
          </div>

          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>
              訂單管理
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  我的銷售
               </div>
              </div>
            </div>
          </div>

          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>
              商品管理
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/seller/product"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  我的商品
               </div>
              </div>
              </Link>
              <div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  上架商品
               </div>
              </div>
              <div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  增新商品
               </div>
              </div>
            </div>
          </div>

          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>
              物流中心
            </div>
            <div className={styles.menuNav_item_subMenuNav}>
              <div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  查看物流情況
               </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Route exact path={"/seller"} component={Product} />
          <Route path={"/seller/product"} component={Product} />
        </div>
      </div>
    </div>
  );
};

export default Seller;
