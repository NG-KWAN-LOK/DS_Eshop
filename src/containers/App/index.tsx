import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { hot } from "react-hot-loader/root";

import WithAuth from "../../hoc/WithAuth";
import Dashboard from "../Dashboard";
import Seller from "../Seller";
import Login from "../Login";
import ShoppingCart from "../ShoppingCart";
import Items from "../Items";
import Casher from "../Casher";
import User from "../User";
import Admin from "../Admin";
import DataPreLoad from "../../hoc/DataPreLoad";

import PATH from "../../utils/pathConst";
import styles from "./styles.scss";
import Search from "../Search";

import findTitle from "../../utils/titleName";

function App() {
  const theme = useSelector((appState: any) => appState.AppReducer.theme);
  const { pathname } = useLocation();
  useEffect(() => {
    var appName = "修皮購物";
    switch (pathname) {
      case "/":
        document.title = appName + "｜修理想購物的心";
        break;
      case "/search":
        break;
      case "/login":
        document.title = findTitle(["登入"]) + appName;
        break;
      case "/shoppingCart":
        document.title = findTitle(["購物車"]) + appName;
        break;
      case "/seller":
        document.title = findTitle(["賣家中心"]) + appName;
        break;
      case "/seller/product":
        document.title = findTitle(["我的商品", "賣家中心"]) + appName;
        break;
      case "/seller/ship":
        document.title = findTitle(["查看物流", "賣家中心"]) + appName;
        break;
      case "/seller/sale":
        document.title = findTitle(["我的銷售", "賣家中心"]) + appName;
        break;
      case "/seller/activeProduct":
        document.title = findTitle(["上架商品", "賣家中心"]) + appName;
        break;
      case "/seller/addProduct":
        document.title = findTitle(["增新商品", "賣家中心"]) + appName;
        break;
      case "/seller/editGoods":
        document.title =
          findTitle(["編輯商品", "我的商品", "賣家中心"]) + appName;
        break;
      case "/admin":
        document.title = findTitle(["所有商品", "管理員頁面"]) + appName;
        break;
      case "/admin/product":
        document.title = findTitle(["所有商品", "管理員頁面"]) + appName;
        break;
      case "/admin/member":
        document.title = findTitle(["所有會員", "管理員頁面"]) + appName;
        break;
      case "/admin/ship":
        document.title = findTitle(["查看物流", "管理員頁面"]) + appName;
        break;
      case "/admin/editGoods":
        document.title =
          findTitle(["編輯商品", "所有商品", "管理員頁面"]) + appName;
        break;
      case "/admin/coupon":
        document.title = findTitle(["所有優惠券", "管理員頁面"]) + appName;
        break;
      case "/admin/addCoupon":
        document.title = findTitle(["增新優惠券", "管理員頁面"]) + appName;
        break;
      case "/admin/editCoupon":
        document.title =
          findTitle(["編輯優惠券", "所有優惠券", "管理員頁面"]) + appName;
        break;
      case "/casher":
        document.title = findTitle(["結帳"]) + appName;
        break;
      case "/user":
        document.title = findTitle(["我的帳戶"]) + appName;
        break;
      case "/items":
        break;
      default:
        console.log("pageTitleNotFound");
        document.title = appName;
        break;
    }
  }, [pathname]);
  return (
    <div className={styles.app} data-theme={theme} id="scroll_container">
      <Switch>
        <DataPreLoad>
          <WithAuth>
            {/* <Header /1> */}
            <Route exact path={"/"} component={Dashboard} />
            <Route path={"/search"} component={Search} />
            <Route path={"/login"} component={Login} />
            <Route path={"/shoppingCart"} component={ShoppingCart} />
            <Route path={"/seller"} component={Seller} />
            <Route path={"/items"} component={Items} />
            <Route path={"/casher"} component={Casher} />
            <Route path={"/user"} component={User} />
            <Route path={"/admin"} component={Admin} />
          </WithAuth>
        </DataPreLoad>
      </Switch>
    </div>
  );
}

export default hot(App);
