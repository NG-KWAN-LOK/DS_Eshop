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

const NavItem: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setCount] = useState("");
  return (
    <div>
      product
    </div>
  );
};

export default React.memo(NavItem);
