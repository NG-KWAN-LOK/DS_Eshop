import api from "../api";

const goodsList = require("./goodsList.json");
const GoodsApi = {
  getGoodsList: () => {
    const url = "/goods/dashboard";
    return new Promise(resolve => resolve(goodsList))
  },
};

export default GoodsApi;
