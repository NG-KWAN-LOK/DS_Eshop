import produce from "immer";

import { SET_LOGIN_STAUTS, SET_USERNAME, SET_IS_CHECK_LOGIN, CLEAN_UP } from "./constants";

const initialState = {
  isLogin: false,
  userName: "",
  isCheckLogin: false,
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case SET_LOGIN_STAUTS:
        draft.isLogin = payload;
        break;
      case SET_USERNAME:
        draft.userName = payload;
        break;
      case SET_IS_CHECK_LOGIN:
        draft.isCheckLogin = payload;
        break;
      case CLEAN_UP:
        draft = { ...initialState };
        break;
      default:
        return draft;
    }
  });
