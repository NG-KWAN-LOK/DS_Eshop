import React, { useCallback, useRef, useState } from "react";
import { Link, Router, Route, useHistory, useLocation } from "react-router-dom";

import styles from "./styles.scss";

interface HeaderProps {}

const ProductList: React.FC<HeaderProps> = () => {
  return (
    <div>
      <div className={styles.top_Padding}></div>
      <div className={styles.shoppingCartContainter}>
        <div className={styles.productHeader}>123</div>
      </div>
    </div>
  );
};

export default React.memo(ProductList);
