import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

function App() {
  const theme = useSelector((appState: any) => appState.AppReducer.theme);
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   var appName = "修皮購物"
  //   switch (pathname) {
  //     case '/':
  //       document.title = appName
  //       break;
  //     default:
  //       document.title = "Home"
  //       break;
  //   }

  // }, [pathname])
  return (
    <div className={styles.app} data-theme={theme} id="scroll_container">
      <Router>
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
      </Router>
    </div>
  );
}

export default hot(App);
