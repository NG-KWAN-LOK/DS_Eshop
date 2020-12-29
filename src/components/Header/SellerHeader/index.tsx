import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductHeader from "./ProductHeader";

import styles from "./styles.scss";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { pathname } = useLocation();

  const getTitle = () => {
    switch (pathname) {
      case "/seller":
        return "我的商品";
      case "/seller/product":
        return "我的商品";
      case "/seller/ship":
        return "查看物流";
      case "/seller/sale":
        return "我的銷售";
      case "/seller/activeProduct":
        return "上架商品";
      case "/seller/addProduct":
        return "增新商品";
      case "/seller/editGoods":
        return "我的商品　>　編輯商品";
      case "/admin":
        return "所有商品";
      case "/admin/product":
        return "所有商品";
      case "/admin/member":
        return "所有會員";
      case "/admin/ship":
        return "查看物流";
      case "/admin/editGoods":
        return "所有商品　>　編輯商品";
      case "/admin/coupon":
        return "所有優惠券";
      case "/admin/addCoupon":
        return "增新優惠券";
      case "/admin/editCoupon":
        return "所有優惠券　>　編輯優惠券";
      default:
        return "foo";
    }
  };
  //const theme = useSelector((appState: any) => appState.AppReducer.theme);

  return (
    <div className={styles.container}>
      <ProductHeader title={getTitle()} />
    </div>
  );
};

export default Header;
