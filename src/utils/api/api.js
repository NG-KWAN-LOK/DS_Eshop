import axios from "axios";

const api = {};

export const instance = axios.create({
  timeout: 20000,
  onUploadProgress: (progressEvent) => {
    document.body.style.cursor =
      progressEvent.loaded === progressEvent.total ? "default" : "progress";
  },
});

api.fire = async (options) => {
  return instance.request({
    ...options,
    baseURL: process.env.API_HOST,
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
