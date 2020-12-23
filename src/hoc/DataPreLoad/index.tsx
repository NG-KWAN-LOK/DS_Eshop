import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import PATH from "../../utils/pathConst";
import Api from "../../utils/api/userAPI";
import * as dashboardActions from "../../containers/Dashboard/actions";

var jwt = require("jsonwebtoken");

interface WithAuthProps {
  children: any;
}

const DataPreLoad: React.FC<WithAuthProps> = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const hotGoodsList = useSelector(
    (appState: any) => appState.DashboardReducer.hotGoodList
  );
  //const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);

  useEffect(() => {
    console.log("datapreload", hotGoodsList);
    if (hotGoodsList.length == 0) {
      console.log("datapreloadhotGoodsList");
      dispatch(dashboardActions.getHotGoodsList());
    }
  }, []);
  return children;
};

export default DataPreLoad;
