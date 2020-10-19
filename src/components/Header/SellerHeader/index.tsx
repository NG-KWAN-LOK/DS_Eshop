import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductHeader from "./ProductHeader";

import styles from "./styles.scss";

interface HeaderProps { }

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
      default:
        return "foo";
    }
  }
  //const theme = useSelector((appState: any) => appState.AppReducer.theme);

  return (
    <div className={styles.container}>
      <ProductHeader title={getTitle()} />
    </div>
  );
};

export default Header;
