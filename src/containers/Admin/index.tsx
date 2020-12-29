import React, { useState, useCallback } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./styles.scss";

import SellerHeader from "../../components/Header/SellerHeader";
import Product from "../../components/AdminPage/Product";
import ProductEditGoods from "../../components/AdminPage/ProductEditGoods";
import Ship from "../../components/AdminPage/Ship";
import Member from "../../components/AdminPage/Member";
import Coupon from "../../components/AdminPage/Coupon";
import AddCoupon from "../../components/AdminPage/AddCoupon";
import EditCoupon from "../../components/AdminPage/EditCoupon";

interface SellerProps {}

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
            <div className={styles.menuNav_item_title}>物流中心</div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/admin/ship"}>
                <div className={styles.menuNav_item_subMenuNav_subItem}>
                  <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                    查看物流
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>會員管理</div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/admin/member"}>
                <div className={styles.menuNav_item_subMenuNav_subItem}>
                  <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                    所有會員
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>商品管理</div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/admin/product"}>
                <div className={styles.menuNav_item_subMenuNav_subItem}>
                  <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                    所有商品
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.menuNav_item}>
            <div className={styles.menuNav_item_title}>優惠券管理</div>
            <div className={styles.menuNav_item_subMenuNav}>
              <Link to={"/admin/coupon"}>
                <div className={styles.menuNav_item_subMenuNav_subItem}>
                  <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                    所有優惠券
                  </div>
                </div>
              </Link>
              <Link to={"/admin/addCoupon"}>
                <div className={styles.menuNav_item_subMenuNav_subItem}>
                  <div className={styles.menuNav_item_subMenuNav_subItem_title}>
                    新增優惠券
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_block}>
            <Route exact path={"/admin"} component={Product} />
            <Route path={"/admin/product"} component={Product} />
            <Route path={"/admin/editGoods"} component={ProductEditGoods} />
            <Route path={"/admin/ship"} component={Ship} />
            <Route path={"/admin/member"} component={Member} />
            <Route path={"/admin/coupon"} component={Coupon} />
            <Route path={"/admin/addCoupon"} component={AddCoupon} />
            <Route path={"/admin/editCoupon"} component={EditCoupon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
