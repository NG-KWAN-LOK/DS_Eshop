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

const ActiveProduct = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setCount] = useState("");
  return (
    <div>
      ActiveProduct
    </div>
  );
};

export default ActiveProduct;
