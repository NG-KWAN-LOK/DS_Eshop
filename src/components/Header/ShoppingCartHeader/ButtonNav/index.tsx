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

interface HeaderProps { }

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [searchKey, setSearchKey] = useState();
  const handleChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
  };
  const handleSubmit = (event) => {
    console.log(searchKey);
    event.preventDefault();
  };
  return (
    <div className={`${styles.navItem_container}`}>
      <div className={styles.navItem_container_contain}>
        <Link to={"/"}>
          <div className={styles.icon}></div>
        </Link>
        <div className={styles.iconTitle}>購物車</div>
        <div className={styles.searchBarContent}>
          <form onSubmit={handleSubmit} className={styles.searchBar}>
            <input
              type={"text"}
              className={styles.searchBar_input}
              placeholder={"搜索"}
              value={searchKey}
              onChange={handleChangeSearchKey}
            />
            <Link to={{ pathname: "/search", search: "?keyword=" + searchKey }}>
              <input
                type="submit"
                className={styles.searchBar_submitButton}
                value=" "
              />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavItem);
