import React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

import styles from "./styles.scss";

import { getParams } from "../../utils/tools"
import Header from "../../components/Header/MainHeader";
interface DashboardProps { }

interface location {
  pathname: string;
  search: string;
}

const Search = () => {
  const location: location = useLocation();
  const { pathname, search } = location;
  const { keyword: keyWord, } = getParams(search, [
    "keyword"
  ]);
  console.log("getkeyword:" + keyWord)

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.top_Padding}></div>
      <div>Search: {keyWord}</div>
    </div>
  );
};

export default Search;
