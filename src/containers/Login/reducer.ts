import produce from "immer";

import { CLEAN_UP } from "../App/constants";

const initialState = {
  isLogin: true,
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN/SETLOGINSTAUTS":
        draft.isLogin = payload;
        break;
      case "CLEAN_UP":
        draft = { ...initialState };
        break;
      default:
        return draft;
    }
  });
