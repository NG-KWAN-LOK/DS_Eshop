import GoodsApi from "../../utils/api/apifetcher/goods";
import { GET_GOODS_LIST_SUCCESS, CLEAN_UP } from "./constants";

export const getGoodsList = () => (dispatch) => {
    dispatch({ type: CLEAN_UP });
    GoodsApi.getGoodsList()
        .then((res) => {
            console.log(res);
            dispatch({ type: GET_GOODS_LIST_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: GET_GOODS_LIST_SUCCESS });
        });
};
