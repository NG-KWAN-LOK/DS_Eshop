import { useSelector, useDispatch } from "react-redux";
import api from "./api";
import * as loginActions from "../../containers/Login/actions";
const userApi = {
  // login: ({ username, password }) =>
  //   api.fire({ url: "", data: { username, password } }),
  // isLogin: () => {
  //   return api.checkIsLogin();
  // },
  userLogin:(_userName, _password) =>{
    let userData = {
      "userName" : _userName,
      "password" : _password
    }
    return api.userLogin({ url: "/users/login",method: "POST",data: userData })
  },

  userSignUp:(_signUpUserName,_name, _phoneNumber, _email, _address) =>{
    //const signUpUserName = useSelector((appState: any) => appState.LoginReducer.signUpUserName);
    let userData = {
      "username" : _signUpUserName._username,
      "password" : _signUpUserName._password,
      "name": _name,
      "telephone": _phoneNumber,
      "email": _email,
      "address": _address
    }
    //console.log(_signUpUserName._username)
    //console.log(signUpUserName._username, signUpUserName._password)
    return api.userLogin({ url: "/users/signUp",method: "POST",data: userData })
  },
};

export default userApi;
