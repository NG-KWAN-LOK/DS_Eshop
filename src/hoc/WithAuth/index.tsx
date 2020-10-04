import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import PATH from "../../utils/pathConst";

interface WithAuthProps {
  children: any;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const isLogin = true;
  console.log("WithAuth");
  // useEffect(() => {
  //   if (isLogin) {
  //     if (pathname === PATH.LOGIN || pathname === "/") {
  //       history.push(PATH.DASHBOARD);
  //     }
  //   } else if (pathname !== PATH.LOGIN) {
  //     history.push(PATH.LOGIN);
  //   }
  // }, [pathname]);

  return children;
};

export default WithAuth;
