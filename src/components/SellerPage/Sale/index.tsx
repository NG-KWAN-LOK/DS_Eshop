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

const Sale = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setCount] = useState("");
  return (
    <div>
      Sale
    </div>
  );
};

export default Sale;
