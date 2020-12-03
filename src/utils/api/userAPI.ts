import api from "./api";

const userApi = {
  // login: ({ username, password }) =>
  //   api.fire({ url: "", data: { username, password } }),
  // isLogin: () => {
  //   return api.checkIsLogin();
  // },
  userLogin:(_userName, _password) =>{
    return api.userLogin({ url: "/users/login", method: "POST",data: { _userName, _password } })},
};

export default userApi;
