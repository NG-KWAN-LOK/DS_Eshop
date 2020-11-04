import { SET_LOGIN_STAUTS, SET_USERNAME, SET_IS_CHECK_LOGIN, CLEAN_UP } from "./constants";

export const tryLogin = () => (dispatch) => {
  const isLogin = true;
  const username = "fuckyou";
  dispatch({ type: SET_LOGIN_STAUTS, payload: isLogin });
  if (isLogin == true)
    dispatch({ type: SET_USERNAME, payload: username });
};

export const setIsCheckLogin = (isCheckLogin) => (dispatch) => {
  dispatch({ type: SET_IS_CHECK_LOGIN, payload: isCheckLogin });
};

export const setUserName = () => (dispatch) => {
  const username = "admin";
  dispatch({ type: SET_USERNAME, payload: username });
};