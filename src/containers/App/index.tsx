import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import WithAuth from "../../hoc/WithAuth";
import Dashboard from "../Dashboard";
import Seller from "../Seller";
import Login from "../Login";

import PATH from "../../utils/pathConst";
import styles from "./styles.scss";
import Search from "../Search";

function App() {
  const theme = useSelector((appState: any) => appState.AppReducer.theme);
  return (
    <div className={styles.app} data-theme={theme} id="scroll_container">
      <Router>
        <Switch>
          {/* <WithAuth> */}
          {/* <Header /> */}
          <Route exact path={"/"} component={Dashboard} />
          <Route path={"/search"} component={Search} />
          <Route path={"/login"} component={Login} />
          <Route path={"/seller"} component={Seller} />
          {/* </WithAuth> */}
        </Switch>
      </Router>
    </div>
  );
}

export default hot(App);
