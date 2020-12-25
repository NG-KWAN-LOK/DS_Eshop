import api from "../api";

const commentData = [
  {
    commentId: "0",
    userName: "admin",
    date: "2020-12-07",
    content: "很不錯的產品"
  },
  {
    commentId: "1",
    userName: "peter",
    date: "2020-12-07",
    content: "爽的咧"
  },
];

const GoodCommentApi = {
  getCommentData: (goodsId) => {
    let userData = {
      "goodsId": goodsId
    }
    console.log(userData)
    return api.userApi({ url: "/comment/findAll", method: "POST", data: userData })
  },
  newCommentData: (goodsId, content) => {
    let userData = {
      "userToken": localStorage.getItem('userToken'),
      "goodsId": goodsId,
      "content": content
    }
    console.log(userData)
    return api.userApi({ url: "/comment/create", method: "POST", data: userData })
  },
};

export default GoodCommentApi;
