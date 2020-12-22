import axios from "axios";

const api = {};
export const instance = axios.create({
  timeout: 20000,
  onUploadProgress: (progressEvent) => {
    document.body.style.cursor =
      progressEvent.loaded === progressEvent.total ? "default" : "progress";
  },
});

api.userApi = async (options) => {
  return await instance.request({
    ...options,
    baseURL: process.env.API_HOST,
    mode:"no-cors",
    headers: {
      ...options.headers,
      "Access-Control-Allow-Origin" : '*',
      "Access-Control-Allow-Methods" : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      "Content-Type": "application/json",
      authorization: localStorage.getItem('userToken'),
    },
  });
};

api.imgurApi = async (options) => {
  return await instance.request({
    ...options,
    "async": true,
    "crossDomain": true,
    url: "https://api.imgur.com/3/image",
    headers: {
      ...options.headers,
      'Authorization': 'Client-ID 4f1f0040b55e238', 
    },
  });
  // return await instance.request({
  //   ...options,
  //   "async": true,
  //   "crossDomain": true,
  //   url: "https://api.imgur.com/3/album/{{albumDeleteHash}}/add",
  //   headers: {
  //     ...options.headers,
  //     'Authorization': 'Client-ID 4f1f0040b55e238', 
  //   },
  // });

  
};


export default api;
//63c7efdf3ed73dcbfacb2d0e024ebf5a79b3ef37
//vUZmyoo7pp7qFVc