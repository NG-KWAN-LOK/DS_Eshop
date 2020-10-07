import produce from "immer";

import { GET_GOODS_LIST_SUCCESS, CLEAN_UP } from "./constants";

const initialState = {
  GoodsList: {},
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case GET_GOODS_LIST_SUCCESS:
        payload.audios.forEach((audio) => {
          draft.GoodsList[audio.id] = audio;
        });
        break;
      case CLEAN_UP:
        draft = { ...initialState };
        break;
      default:
        return draft;
    }
  });
