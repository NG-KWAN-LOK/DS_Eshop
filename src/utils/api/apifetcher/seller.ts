import { useSelector } from "react-redux";
import api from "../api";
import * as loginActions from "../../../containers/Login/actions";
const userApi = {
  // login: ({ username, password }) =>
  //   api.fire({ url: "", data: { username, password } }),
  // isLogin: () => {
  //   return api.checkIsLogin();
  // },
  getItemInfo:(id) =>{
    console.log(id)
    return api.userApi({ url: "/items/getItem",method: "GET",params: {
      id,
    },})
  },

  updateItemInfo:(id,goodsName, goodsDesription, goodsImg, goodsPrice, goodsStock, goodsSale) =>{
    //const signUpUserName = useSelector((appState: any) => appState.LoginReducer.signUpUserName);
    let userData = {
      "id" : id,
      "name":goodsName,
      "description":goodsDesription,
      "imgURL":goodsImg,
      "price":goodsPrice,
      "stock":goodsStock,
      "sales": goodsSale,
      "category": "XXXX",
      "isDisplay": "false"
    }
    //console.log(_signUpUserName._username)
    console.log(userData)
    return api.userApi({ url: "/items/updateInfo",method: "POST",data: userData })
  },

  getSellerGoodsList:() =>{
    let userData = {
      "userToken" : localStorage.getItem('userToken')
    }
    return api.userApi({ url: "/items/getAllItems",method: "POST", data: userData })
  },

  newItem:(goodsName, goodsDesription, goodsImg, goodsPrice, goodsStock) =>{
    let userData = {
      "userToken" : localStorage.getItem('userToken'),
      "name":goodsName,
      "description":goodsDesription,
      "imgURL":goodsImg,
      "price":goodsPrice,
      "stock":goodsStock,
      "isDisplay": 0
    }
    //console.log(_signUpUserName._username)
    console.log(userData)
    return api.userApi({ url: "/items/new",method: "POST",data: userData })
  },

  deleteItem:(id) =>{
    console.log(id)
    let userData = {
      "id" : id
    }
    return api.userApi({ url: "/items/deleteItem",method: "POST", data: userData })
  }
};

export default userApi;
