import api from "../api";

const shoppingCartData = [
  {
    shoppingCartID: "0",
    sellerUserName: "admin",
    goodsList: [{
      goodId: "0",
      name:
        "賣老婆1 新垣結衣 gaki Aragaki Yui 可愛日本人妻 明星 美女 星野原真是爽",
      imgURL: "https://attach.setn.com/newsimages/2020/04/28/2527272-XXL.jpg",
      price: "999",
      count: 99,
    }, {
      goodId: "1",
      imgURL:
        "https://images.chinatimes.com/newsphoto/2020-10-07/900/20201007003536.jpg",
      name:
        "賣老婆2 石原里美 石原聰美 石神国子 Ishihara Satomi 可愛日本人妻 明星 美女",
      price: "999",
      count: 99,
    },]
  },
  {
    shoppingCartID: "1",
    sellerUserName: "admin",
    goodsList: [{
      goodId: "0",
      name:
        "賣老婆1 新垣結衣 gaki Aragaki Yui 可愛日本人妻 明星 美女 星野原真是爽",
      imgURL: "https://attach.setn.com/newsimages/2020/04/28/2527272-XXL.jpg",
      price: "999",
      count: 3,
    }, {
      goodId: "1",
      imgURL:
        "https://images.chinatimes.com/newsphoto/2020-10-07/900/20201007003536.jpg",
      name:
        "賣老婆2 石原里美 石原聰美 石神国子 Ishihara Satomi 可愛日本人妻 明星 美女",
      price: "999",
      count: 4,
    },]
  },
];

const ShoppingCartApi = {
  // getShoppingCartList: () => {
  //   return new Promise((resolve) => resolve(shoppingCartData));
  // },
  newItem: (goodID, count) => {
    let userData = {
      "userToken": localStorage.getItem('userToken'),
      "goodId": goodID,
      "count": count,
    }
    console.log(userData)
    return api.userApi({ url: "shoppingCart/addGoods", method: "POST", data: userData })
  },
  getShoppingCartList: () => {
    let userData = {
      "userToken": localStorage.getItem('userToken'),
    }
    console.log(userData)
    return api.userApi({ url: "shoppingCart/getCartAll", method: "POST", data: userData })
  },
  reduceShoppingCartItem: (goodId) => {
    let userData = {
      "userToken": localStorage.getItem('userToken'),
      "goodId": goodId
    }
    console.log(userData)
    return api.userApi({ url: "shoppingCart/reduceGoodsAmount", method: "POST", data: userData })
  },
  deleteShoppingCartItem: (goodId) => {
    let userData = {
      "userToken": localStorage.getItem('userToken'),
      "goodId": goodId
    }
    console.log(userData)
    return api.userApi({ url: "shoppingCart/deleteCartGood", method: "POST", data: userData })
  },
  
};

export default ShoppingCartApi;
