import produce from "immer";

import { CLEAN_UP,SET_HOT_GOOD_LIST } from "./constants";
//import { GET_DASHBOARD_LIST_LIMIT } from "../../utils/constants";

const initialState = {
  hotGoodList: [],
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case CLEAN_UP:
        draft = { ...initialState };
        break;
      case SET_HOT_GOOD_LIST:
        draft.hotGoodList = payload;
        break;
      default:
        return draft;
    }
  });
