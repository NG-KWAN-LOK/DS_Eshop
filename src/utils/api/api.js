import axios from "axios";

const api = {};
export const instance = axios.create({
  timeout: 20000,
  onUploadProgress: (progressEvent) => {
    document.body.style.cursor =
      progressEvent.loaded === progressEvent.total ? "default" : "progress";
  },
});

api.userLogin = async (options) => {
  return await instance.request({
    ...options,
    baseURL: process.env.API_HOST,
    mode:"cors",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
};

api.checkIsLogin = async (options) => {
  return true;
};

export default api;
