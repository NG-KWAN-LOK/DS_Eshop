import React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

import styles from "./styles.scss";

import { getParams } from "../../utils/tools"
import Header from "../../components/Header/MainHeader";
import GoodsCard from "../../components/GoodsCard"
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
      <div className={styles.pageContainer}>
        <div className={styles.pageContainer_searchContainer}>
          <div className={styles.pageContainer_searchContainer_searchResultText}>'<span className={styles.pageContainer_searchContainer_searchResultText_heightLight}>{keyWord}</span>'搜尋結果</div>
          <div className={styles.pageContainer_searchContainer_searchResultContainer}>
            <div className={styles.pageContainer_searchContainer_searchResultContainer_itemContainer}>
              <div className={styles.pageContainer_searchContainer_searchResultContainer_itemContainer_imageContainer}>
                <img className={styles.pageContainer_searchContainer_searchResultContainer_itemContainer_imageContainer_img} src="https://attach.setn.com/newsimages/2020/04/28/2527272-XXL.jpg"></img>
              </div>
              <div className={styles.pageContainer_searchContainer_searchResultContainer_itemContainer_info}>
                <div className={styles.pageContainer_searchContainer_searchResultContainer_itemContainer_info_title}>屌你老母</div>
                <div className={styles.pageContainer_searchContainer_searchResultContainer_itemContainer_info_price}>$9999</div>
              </div>
            </div>
            <GoodsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
