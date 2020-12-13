import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.scss";

import GoodsApi from "../../utils/api/apifetcher/goods";

import { getParams } from "../../utils/tools";
import Header from "../../components/Header/MainHeader";
import GoodsCard from "../../components/GoodsCard";

import * as SearchActions from "./actions";
interface DashboardProps { }

interface location {
  pathname: string;
  search: string;
}

const Search = () => {
  const dispatch = useDispatch();
  const location: location = useLocation();
  const { pathname, search } = location;
  const { keyword: keyWord } = getParams(search, ["keyword"]);
  const [goodsList, getGoodsList] = useState([]);
  console.log("getkeyword:" + keyWord);

  useEffect(() => {
    GoodsApi.getGoodsList()
      .then((res) => {
        //console.log(res);
        getGoodsList(res);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  // const goodsList = useSelector((appState: any) => appState.SearchReducer.GoodsList);
  console.log(goodsList);
  // const getGoodsData = () => {
  //   goodsList.forEach(data => {
  //     return data
  //   });
  // }
  // const GoodsCard = ({ goodsData }) => {
  //   return goodsData.map((e) => e);
  // };
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.top_Padding}></div>
      <div className={styles.pageContainer}>
        <div className={styles.pageContainer_searchContainer}>
          <div
            className={styles.pageContainer_searchContainer_searchResultText}
          >
            '
            <span
              className={
                styles.pageContainer_searchContainer_searchResultText_heightLight
              }
            >
              {keyWord}
            </span>
            '搜尋結果
          </div>
          <div
            className={
              styles.pageContainer_searchContainer_searchResultContainer
            }
          >
            {goodsList.map((data, index) => {
              return <GoodsCard key={data.id} goodsData={data} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
