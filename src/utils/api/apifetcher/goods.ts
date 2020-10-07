import api from "../api";

// const goodsList = require("./goodList.json");
const goodList = [{
  id: "0",
  name: "屌老母1",
  price: "999"
}, {
  id: "1",
  name: "屌老母2",
  price: "999"
}];
const GoodsApi = {
  getGoodsList: () => {
    const url = "/goods/dashboard";
    return new Promise(resolve => resolve(goodList))
  },
};

export default GoodsApi;
