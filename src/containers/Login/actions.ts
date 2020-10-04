export const setIsLogin = (isLogin) => (dispatch) => {
  console.log("setIsLogin");
  dispatch({ type: "LOGIN/SETLOGINSTAUTS", payload: isLogin });
};
