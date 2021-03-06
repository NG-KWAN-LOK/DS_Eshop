import api from "../api";

const orderData = [
  {
    orderId: "0",
    status: "1", //狀態(0:已取消,1:備貨中,2:待出貨,3:待收貨,4已完成)
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
    orderId: "1",
    status: "4", //狀態(0:已取消,1:備貨中,2:待出貨,3:待收貨,4已完成)
    goodsList: [{
      goodId: "0",
      name:
        "賣老婆1 新垣結衣 gaki Aragaki Yui 可愛日本人妻 明星 美女 星野原真是爽 星野原真是爽 星野原真是爽 星野原真是爽 星野原真是爽",
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

const OrderApi = {
  getOrdersList: () => {
    return new Promise((resolve) => resolve(orderData));
  },
  setOrderState: (orderId, status) => {
    let userData = {
      "orderId": orderId,
      "status": status, //狀態(0:已取消,1:備貨中,2:待出貨,3:待收貨,4已完成)
    }
    console.log(userData)
    return api.userApi({ url: "/sellermenu/setorderstate", method: "POST", data: userData })
  },
};

export default OrderApi;
