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
  const [quantity, setQuantity] = useState(1);
  const handleChangeQuantity = (e) => {
    if (e.target.value > 0 || e.target.value === "")
      if (e.target.value === "") setQuantity(e.target.value);
      else setQuantity(e.target.value);
  };
  const handleChangeQuantityMins = () => {
    if (quantity > 1) setQuantity(Number(quantity) - 1);
  };
  const handleChangeQuantityPlus = () => {
    setQuantity(Number(quantity) + 1);
  };
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
  console.log(quantity);
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
              <div
                className={
                  styles.pageContainer_itemContainer_header_right_optionContainer
                }
              >
                <div
                  className={
                    styles.pageContainer_itemContainer_header_right_optionContainer_title
                  }
                >
                  數量
                </div>
                <div
                  className={
                    styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity
                  }
                >
                  <input
                    type="button"
                    value="-"
                    className={
                      styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity_minus
                    }
                    onClick={handleChangeQuantityMins}
                  />
                  <input
                    type="number"
                    step={1}
                    min={0}
                    max=""
                    name="quantity"
                    value={quantity}
                    title="Qty"
                    className={
                      styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity_text
                    }
                    size={4}
                    pattern=""
                    onChange={handleChangeQuantity}
                  />
                  <input
                    type="button"
                    value="+"
                    className={
                      styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity_plus
                    }
                    onClick={handleChangeQuantityPlus}
                  />
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
