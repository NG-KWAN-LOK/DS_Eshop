import api from "../api";

const goodList = [
  {
    id: "0",
    name:
      "賣老婆1 新垣結衣 gaki Aragaki Yui 可愛日本人妻 明星 美女 星野原真是爽",
    imgURL: "https://attach.setn.com/newsimages/2020/04/28/2527272-XXL.jpg",
    price: 999,
    stock: 99,
    isDisplay: 0,
  },
  {
    id: "1",
    imgURL:
      "https://images.chinatimes.com/newsphoto/2020-10-07/900/20201007003536.jpg",
    name:
      "賣老婆2 石原里美 石原聰美 石神国子 Ishihara Satomi 可愛日本人妻 明星 美女",
    price: 999,
    stock: 99,
    isDisplay: 1,
  },
];

const GoodsApi = {
  getGoodsList: () => {
    return new Promise((resolve) => resolve(goodList));
  },
  getGoodsItemInfo: (goodsID) => {
    return new Promise((resolve) => resolve(goodList[goodsID]));
  },
};

export default GoodsApi;
