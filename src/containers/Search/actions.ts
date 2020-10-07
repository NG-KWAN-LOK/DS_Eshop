import GoodsApi from "../../utils/api/apifetcher/goods";
import { GET_GOODS_LIST_SUCCESS, CLEAN_UP } from "./constants";

export const getGoodsList = () => (dispatch) => {
    GoodsApi.getGoodsList()
        .then((res) => {
            dispatch({ type: GET_GOODS_LIST_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            dispatch({ type: GET_GOODS_LIST_SUCCESS });
        });
};
