import { CLEAN_UP,SET_HOT_GOOD_LIST } from "./constants";
import GoodsApi from "../../utils/api/apifetcher/goods";

export const getHotGoodsList = () => (dispatch) => {
    //const isLogin = true;
    //dispatch({ type: SET_LOGIN_STAUTS, payload: isLogin });
    // return GoodsApi.userLogin(userName, password)
    //   .then((res) => {
    //     if(res.data != "密碼錯誤"){
    //       localStorage.setItem('userToken',res.data.userToken);
    //       dispatch({ type: SET_USERDATA, payload: res.data });
    //       dispatch({ type: SET_LOGIN_STAUTS, payload: true });
    //       console.log(res.data.userToken)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("wrong password")
    //     dispatch({ type: SET_LOGIN_STAUTS, payload: false });
    //   });
    return GoodsApi.getHotsalesGoods()
        .then((res) => {
        //console.log(res);
        dispatch({ type: SET_HOT_GOOD_LIST, payload: res.data });
        })
        .catch((err) => {
        console.log("error");
        });
  };