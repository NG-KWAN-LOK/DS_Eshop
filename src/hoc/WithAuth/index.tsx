import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PATH from "../../utils/pathConst";

import * as loginActions from "../../containers/Login/actions";

interface WithAuthProps {
  children: any;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const isCheckLogin = useSelector((appState: any) => appState.LoginReducer.isCheckLogin);
  if (!isCheckLogin) {
    dispatch(loginActions.setIsCheckLogin(true));
    console.log("WithAuth");
  }
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
