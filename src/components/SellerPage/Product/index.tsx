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

interface HeaderProps { }

const Product = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setCount] = useState("");
  const goodsCount = 0;
  return (
    <div className={styles.container}>
      <div className={styles.container_titleBar}>
        <div className={styles.container_titleBar_titleContent}>
          {goodsCount}件商品
        </div>
        <div className={styles.container_goodsItemListContainer}>
          <div className={styles.container_goodsItemListContainer_header}>
            <div className={styles.container_goodsItemListContainer_header_goodsName}>
              商品名稱
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsPrice}>
              <span>價格</span>
            </div>
            <div className={styles.container_goodsItemListContainer_header_goodsPrice}>
              <span>操作</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
