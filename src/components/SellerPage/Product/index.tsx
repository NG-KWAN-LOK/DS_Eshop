import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Link,
  Router,
  Route,
  useHistory,
  useLocation,
  Switch,
} from "react-router-dom";

import styles from "./styles.scss";
import GoodsApi from "../../../utils/api/apifetcher/goods";

import ProductGoodsItem from "./ProductGoodsItem"

interface HeaderProps { }

const Product = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setCount] = useState("");
  const [goodsList, getGoodsList] = useState([]);
  //const goodsCount = 0;
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
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_titleBar_titleContent}>
          {goodsList.length}件商品
        </div>
        <div className={styles.container_goodsItemListContainer}>
          <div className={styles.container_goodsItemListContainer_header}>
            <div className={styles.container_goodsItemListContainer_header_goodsName}>
              商品名稱
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsPrice}>
              <span>價格</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsStock}>
              <span>商品數量</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsPrice}>
              <span>操作</span>
            </div>
          </div>
          <div className={styles.container_goodsItemListContainer_item}>
            {goodsList.map((data, index) => {
              return <ProductGoodsItem goodsData={data} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
