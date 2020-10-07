import { SET_LOGIN_STAUTS, SET_USERNAME, SET_IS_CHECK_LOGIN, CLEAN_UP } from "./constants";

export const setIsLogin = (isLogin) => (dispatch) => {
  dispatch({ type: SET_LOGIN_STAUTS, payload: isLogin });
};

export const setIsCheckLogin = (isCheckLogin) => (dispatch) => {
  dispatch({ type: SET_IS_CHECK_LOGIN, payload: isCheckLogin });
};
