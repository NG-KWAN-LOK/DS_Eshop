import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.scss";

import GoodsApi from "../../utils/api/apifetcher/goods";

import { getParams } from "../../utils/tools";
import Header from "../../components/Header/MainHeader";
import GoodsCard from "../../components/GoodsCard";

import * as SearchActions from "./actions";
interface DashboardProps {}

interface location {
  pathname: string;
  search: string;
}

const Item = () => {
  const dispatch = useDispatch();
  const location: location = useLocation();
  const { pathname, search } = location;
  const { goodsID: goodsID } = getParams(search, ["goodsID"]);
  const [goodsItemInfo, setGoodsItemInfo] = useState([]);
  console.log("goodsID:" + goodsID);
  useEffect(() => {
    GoodsApi.getGoodsItemInfo(goodsID)
      .then((res) => {
        setGoodsItemInfo(res);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  console.log(goodsItemInfo);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.top_Padding}></div>
      <div className={styles.pageContainer}>
        <div className={styles.pageContainer_itemContainer}>
          <div className={styles.pageContainer_itemContainer_header}>
            <div className={styles.pageContainer_itemContainer_header_left}>
              <div
                className={
                  styles.pageContainer_itemContainer_header_left_imageContainer
                }
              >
                <img
                  className={
                    styles.pageContainer_itemContainer_header_left_imageContainer_img
                  }
                  src={goodsItemInfo.imgURL}
                ></img>
              </div>
            </div>
            <div className={styles.pageContainer_itemContainer_header_right}>
              <div
                className={
                  styles.pageContainer_itemContainer_header_right_itemTitle
                }
              >
                {goodsItemInfo.name}
              </div>
              <div
                className={
                  styles.pageContainer_itemContainer_header_right_priceContainer
                }
              >
                <div
                  className={
                    styles.pageContainer_itemContainer_header_right_priceContainer_priceTitle
                  }
                >
                  ${goodsItemInfo.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
