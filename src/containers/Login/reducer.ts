import produce from "immer";

import { SET_LOGIN_STAUTS, SET_USERDATA, SET_IS_CHECK_LOGIN, SET_SIGNUP_USER_NAME ,CLEAN_UP } from "./constants";

const initialState = {
  isLogin: false,
  userData: [],
  signUpUserName:"",
  isCheckLogin: false,
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case SET_LOGIN_STAUTS:
        draft.isLogin = payload;
        break;
      case SET_USERDATA:
        draft.userData = payload;
        break;
      case SET_IS_CHECK_LOGIN:
        draft.isCheckLogin = payload;
        break;
      case SET_SIGNUP_USER_NAME:
        draft.signUpUserName = payload
      case CLEAN_UP:
        draft = { ...initialState };
        break;
      default:
        return draft;
    }
  });
