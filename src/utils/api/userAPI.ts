import api from "./api";

const userApi = {
  login: ({ username, password }) =>
    api.fire({ url: "", data: { username, password } }),
  isLogin: () => {
    return api.checkIsLogin();
  },
};

export default userApi;
