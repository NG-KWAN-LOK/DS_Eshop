import React, { useCallback, useRef, useState } from "react";
import { Link, Router, Route, useHistory, useLocation, Switch } from "react-router-dom";

import styles from "./styles.scss";

import Search from "../../../../containers/Search"

interface HeaderProps { }

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [searchKey, setSearchKey] = useState();
  const isLogin = false;
  const handleChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
  };
  const handleSubmit = (event) => {
    console.log(searchKey);
    event.preventDefault();
  };
  const routeChangeToShoppingCart = useCallback(() => {
    if (isLogin) {
      var path = "/shoppingCart";
      history.push(path);
    } else {
      var path = "/login";
      history.push(path);
    }
  }, []);
  return (
    <div className={`${styles.navItem_container}`}>
      <div className={styles.navItem_container_contain}>
        <Link to={"/"}>
          <div className={styles.icon}></div>
        </Link>
        <form onSubmit={handleSubmit} className={styles.searchBar}>
          <input
            type={"text"}
            className={styles.searchBar_input}
            placeholder={"搜索"}
            value={searchKey}
            onChange={handleChangeSearchKey}
          />
          <Link to={{ pathname: "/search", search: "?keyword=" + searchKey }}>
            <input type="submit" className={styles.searchBar_submitButton} value=" " />
          </Link>
        </form>

        <div className={styles.shoppingCart}>
          <div
            className={styles.shoppingCart_icon}
            onClick={routeChangeToShoppingCart}
          ></div>
        </div>
      </div>
    </div >
  );
};

export default React.memo(NavItem);
