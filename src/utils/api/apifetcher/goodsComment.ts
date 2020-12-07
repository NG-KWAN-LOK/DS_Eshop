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
  getCommentData: () => {
    return new Promise((resolve) => resolve(commentData));
  },
};

export default GoodCommentApi;
