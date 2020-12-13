import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import PATH from "../../utils/pathConst";
import Api from "../../utils/api/userAPI"
import * as loginActions from "../../containers/Login/actions";

var jwt = require('jsonwebtoken');

interface WithAuthProps {
  children: any;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const isCheckLogin = useSelector((appState: any) => appState.LoginReducer.isCheckLogin);

  const token = localStorage.getItem('userToken');

  function getCurrentDateTime(date) {
    var currentDateTime =
      date.getFullYear() +
      (date.getMonth() + 1 < 10 ? "0" : "") +
      (date.getMonth() + 1) +
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      (date.getHours() < 10 ? "0" : "") +
      date.getHours() +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes() +
      (date.getSeconds() < 10 ? "0" : "") +
      date.getSeconds();
    return currentDateTime;
  }

  useEffect(()=>{
    const { payload } = token? jwt.decode(token):{};
    dispatch(loginActions.setIsCheckLogin(true));
    if(!token || !payload || (payload.exp*1000) < Date.now()){
      localStorage.removeItem('userToken');
      dispatch(loginActions.setIsCheckLogin(true));
      console.log("WithAuth not Logined");
    }
    else{
      // if(pathname ==='/login'){
      //   history.push('/');
      // }
      console.log(format(payload.exp * 1000, "MMMM do, yyyy H:mma") ,format(Date.now(), "MMMM do, yyyy H:mma"))
      Api.getUserData()
        .then((res) => {
          dispatch(loginActions.setLogInStatus(true));
          //console.log("WithAuth Logined",res.data);
          const userData = {...res.data,userToken:token}
          console.log(userData)
          dispatch(loginActions.setUserData(userData));
        })
        .catch((err) => {
          console.log("fail")
          dispatch(loginActions.setLogInStatus(false));
          console.log("WithAuth not Logined");
        });
    }

  },[token,pathname]);
    return children;
};

export default WithAuth;
