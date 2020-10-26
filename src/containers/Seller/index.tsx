import React, { useState, useCallback } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

import SellerHeader from "../../components/Header/SellerHeader";
import Product from "../../components/SellerPage/Product";
import Ship from "../../components/SellerPage/Ship";
import Sale from "../../components/SellerPage/Sale";
import ActiveProduct from "../../components/SellerPage/ActiveProduct";
import AddProduct from "../../components/SellerPage/AddProduct";

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
              <Link to={"/seller/sale"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  我的銷售
               </div>
              </div>
              </Link>
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
              <Link to={"/seller/activeProduct"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  上架商品
               </div>
              </div>
              </Link>
              <Link to={"/seller/addProduct"}><div className={styles.menuNav_item_subMenuNav_subItem}>
                <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                  增新商品
               </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_block}>
            <Route exact path={"/seller"} component={Product} />
            <Route path={"/seller/product"} component={Product} />
            <Route path={"/seller/ship"} component={Ship} />
            <Route path={"/seller/sale"} component={Sale} />
            <Route path={"/seller/activeProduct"} component={ActiveProduct} />
            <Route path={"/seller/addProduct"} component={AddProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
