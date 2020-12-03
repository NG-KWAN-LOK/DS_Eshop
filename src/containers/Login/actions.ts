import { SET_LOGIN_STAUTS, SET_USERDATA, SET_IS_CHECK_LOGIN,SET_SIGNUP_USER_NAME, CLEAN_UP } from "./constants";
import Api from "../../utils/api/userAPI"
export const tryLogin = (userName,password) => (dispatch) => {
  const isLogin = true;
  //dispatch({ type: SET_LOGIN_STAUTS, payload: isLogin });
    Api.userLogin(userName, password)
      .then((res) => {
        //dispatch({ type: SET_USERDATA, payload: res[0] });
        console.log(res)
      })
      .catch((err) => {
      });
};

export const setIsCheckLogin = (isCheckLogin) => (dispatch) => {
  dispatch({ type: SET_IS_CHECK_LOGIN, payload: isCheckLogin });
};

export const setSignUpUserName = (_signUpUserName) => (dispatch) => {
  dispatch({ type: SET_SIGNUP_USER_NAME, payload: _signUpUserName });
  console.log(_signUpUserName);
};

export const setUserData = () => (dispatch) => {
  const username = "admin";
  dispatch({ type: SET_USERDATA, payload: username });
};

// export const getDashboradList = () => (dispatch, getAppState) => {
//   const {
//     next,
//     randomCode,
//     isLoading,
//     isAllFetched,
//   } = getAppState().DashboardReducer;

//   if (isLoading || isAllFetched) {
//     return;
//   }

//   dispatch({ type: GET_DASHBOARD_LIST });
//   MediaApi.getDashboardList(next, randomCode)
//     .then((res) => {
//       dispatch({ type: GET_DASHBOARD_LIST_SUCCESS, payload: res.data });
//     })
//     .catch((err) => {
//       dispatch({ type: GET_DASHBOARD_LIST_ERROR });
//     });
// };