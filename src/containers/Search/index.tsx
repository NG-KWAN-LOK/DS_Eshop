import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.scss";

import GoodsApi from "../../utils/api/apifetcher/goods";

import { getParams } from "../../utils/tools";
import Header from "../../components/Header/MainHeader";
import GoodsCard from "../../components/GoodsCard";
import Loading from "../../components/PopUpLayer/Loading"
import Alert from "../../components/PopUpLayer/Alert"


import * as SearchActions from "./actions";
interface DashboardProps { }

interface location {
  pathname: string;
  search: string;
}

const Search = () => {
  const location: location = useLocation();
  const history = useHistory();
  const { pathname, search } = location;
  const { keyword: keyWord , orderBy:orderBy, orderByKeyword:orderByKeyword} = getParams(search, ["keyword", "orderBy", "orderByKeyword"]);
  const [goodsList, getGoodsList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  useEffect(() => {
  searchGoods()
  history.listen((location, action) => {
    //console.log("getkeyword:" + keyWord, location);
    // Do stuff.
  })
  }, [location]);
  function searchGoods(){
    console.log("getkeyword:" + keyWord + "orderBy:" + orderBy + "orderByKeyword:" + orderByKeyword);
    setIsloading(true)
    GoodsApi.searchGoods(keyWord, orderBy, orderByKeyword)
      .then((res) => {
        //console.log(res);
        const newData = res.data
        getGoodsList(newData);
        setIsloading(false)
      })
      .catch((err) => {
        console.log("error");
        setIsloading(false)
        setIsErrorAlert(true)
      });
  }
  function setSortingMethon(mode, orderMode = "asc"){
    history.push(`/search?keyword=${keyWord}&orderBy=${orderMode}&orderByKeyword=${mode}`)
  }
  //console.log(goodsList);

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
            <span className={styles.pageContainer_searchContainer_searchResultText_heightLight}
            >
              {keyWord}
            </span>
            '搜尋結果
          </div>
          <div className= {styles.pageContainer_searchContainer_sortingBar}>
            <div className= {styles.pageContainer_searchContainer_sortingBar_text}>
              篩選
            </div>
            {orderByKeyword === "name"?<div className={styles.pageContainer_searchContainer_sortingBar_btn_isSelect}>
              名稱
            </div>:
            <div className={styles.pageContainer_searchContainer_sortingBar_btn_notSelect} onClick={()=>setSortingMethon("name")}>
              名稱
            </div>
            }
            {orderByKeyword === "sales"?<div className={styles.pageContainer_searchContainer_sortingBar_btn_isSelect}>
              最熱銷
            </div>:
            <div className={styles.pageContainer_searchContainer_sortingBar_btn_notSelect} onClick={()=>setSortingMethon("sales")}>
              最熱銷
            </div>
            }
            <div className= {styles.pageContainer_searchContainer_sortingBar_sortPrice}>
              <div className= {styles.pageContainer_searchContainer_sortingBar_sortPrice_subtitle}>
                <span className= {orderByKeyword === "price"?styles.pageContainer_searchContainer_sortingBar_sortPrice_text_isSelect:styles.pageContainer_searchContainer_sortingBar_sortPrice_text_notSelect}>
                  價格：{orderByKeyword === "price"?orderBy === "asc"?"低至高":"高至低" : ""}
                </span>
                <span className= {styles.pageContainer_searchContainer_sortingBar_sortPrice_arrow}>
                </span>
              </div>
              <div className={styles.pageContainer_searchContainer_sortingBar_sortPrice_under}>
                <div className={styles.pageContainer_searchContainer_sortingBar_sortPrice_under_subtitle} onClick={()=>setSortingMethon("price", "asc")}>
                  <span className={styles.pageContainer_searchContainer_sortingBar_sortPrice_under_text}>
                    價格：低至高
                  </span>
                  {orderByKeyword === "price" && orderBy === "asc"? <span className= {styles.pageContainer_searchContainer_sortingBar_sortPrice_under_tick}>
                  </span>:""}
                </div>
                <div className={styles.pageContainer_searchContainer_sortingBar_sortPrice_under_subtitle} onClick={()=>setSortingMethon("price","desc")}>
                  <span className={styles.pageContainer_searchContainer_sortingBar_sortPrice_under_text}>
                    價格：高至低
                  </span>
                  {orderByKeyword === "price" && orderBy === "desc"? <span className= {styles.pageContainer_searchContainer_sortingBar_sortPrice_under_tick}>
                  </span>:""}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.pageContainer_searchContainer_searchResultContainer}>
            {goodsList.map((data, index) => {
              return <GoodsCard key={data.id} goodsData={data} />;
            })}
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && <Alert type={"error"} content={"網路錯誤"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default Search;
