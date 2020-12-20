import React, { useCallback, useRef, useState } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";

import styles from "./styles.scss";

import Search from "../../../../containers/Search";

interface HeaderProps {}

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [searchKey, setSearchKey] = useState();
  const [orderBy, setOrderBy] = useState("asc");
  const [orderByKeyword, setOrderByKeyword] = useState("name");
  const handleChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchKey);
    history.push(`/search?keyword=${searchKey}&orderBy=${orderBy}&orderByKeyword=${orderByKeyword}`)
  };
  const routeChangeToShoppingCart = useCallback(() => {
    var path = "/shoppingCart";
    history.push(path);
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
          <input
            type="submit"
            className={styles.searchBar_submitButton}
            value=" "
          />
        </form>

        <div className={styles.shoppingCart}>
          <div
            className={styles.shoppingCart_icon}
            onClick={routeChangeToShoppingCart}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavItem);
