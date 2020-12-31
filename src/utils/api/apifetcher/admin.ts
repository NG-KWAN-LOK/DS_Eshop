import api from "../api";
const memberList = [
  {
    id: "0",
    userName: "admin",
    customerName: "陳小明",
    address: "台北市中正區忠孝東路二段87號",
    email: "chenming@gmail.com",
    phoneNumber: "0912345678",
    createTime: "2020-12-16 04:41:14"
  },
  {
    id: "1",
    userName: "peter",
    customerName: "on9",
    address: "台北市中正區忠孝東路二段87號",
    email: "chenming@gmail.com",
    phoneNumber: "0912345678",
    createTime: "2020-12-16 04:41:14"
  },
];
const userApi = {
  // login: ({ username, password }) =>
  //   api.fire({ url: "", data: { username, password } }),
  // isLogin: () => {
  //   return api.checkIsLogin();
  // },
  // getMemberList: () => {
  //   return new Promise((resolve) => resolve(memberList));
  // },

  getItemInfo: (id) => {
    console.log(id)
    return api.userApi({
      url: "/items/getItem", method: "GET", params: {
        id,
      },
    })
  },

  updateItemInfo: (id, goodsName, goodsDesription, goodsImg, goodsPrice, goodsStock, goodsSale) => {
    //const signUpUserName = useSelector((appState: any) => appState.LoginReducer.signUpUserName);
    let userData = {
      "id": id,
      "name": goodsName,
      "description": goodsDesription,
      "imgURL": goodsImg,
      "price": goodsPrice,
      "stock": goodsStock,
      "sales": goodsSale,
      "category": "XXXX",
      "isDisplay": "false"
    }
    //console.log(_signUpUserName._username)
    console.log(userData)
    return api.userApi({ url: "/items/updateInfo", method: "POST", data: userData })
  },

  getSellerGoodsList: () => {
    let userData = {
      "userToken": localStorage.getItem('userToken')
    }
    return api.userApi({ url: "/admin/adminGetAllGoods", method: "POST", data: userData })
  },

  getMemberList: () => {
    let userData = {
      "userToken": localStorage.getItem('userToken')
    }
    return api.userApi({ url: "/admin/adminGetAllUsers", method: "POST", data: userData })
  },
  deleteMember: (userId) => {
    let userData = {
      "userToken": localStorage.getItem('userToken'),
      "userId":userId
    }
    return api.userApi({ url: "/admin/adminDeleteUser", method: "POST", data: userData })
  },

  deleteItem: (id) => {
    console.log(id)
    let userData = {
      "id": id
    }
    return api.userApi({ url: "/items/deleteItem", method: "POST", data: userData })
  },
  newCoupon: (couponName, description, discountContent, startDate = "", endDate = "") => {
    let userData = {
      "couponName": couponName,
      "description": description,
      "discountContent": discountContent,
      "startDate": startDate,
      "endDate": endDate
    }
    //console.log(_signUpUserName._username)
    console.log(userData)
    return api.userApi({ url: "/coupon/create", method: "POST", data: userData })
  },
  updateCoupon: (couponName, NewCouponName, Newdescription, discountContent, startDate = "", endDate = "") => {
    let userData = {
      "couponName": couponName,
      "NewcouponName": NewCouponName,
      "Newdescription": Newdescription,
      "NewdiscountContent": discountContent,
      "NewstartDate": startDate,
      "NewendDate": endDate
    }
    //console.log(_signUpUserName._username)
    console.log(userData)
    return api.userApi({ url: "/coupon/modify", method: "POST", data: userData })
  },
};

export default userApi;
