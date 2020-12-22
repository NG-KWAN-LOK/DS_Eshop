import api from "./api";
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
    console.log(userData)
    return api.userApi({ url: "/users/login",method: "POST",data: userData })
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
    console.log(userData)
    return api.userApi({ url: "/users/signUp",method: "POST",data: userData })
  },

  getUserData:() =>{
    let userData = {
      "userToken" : localStorage.getItem('userToken'),
    }
    console.log(userData)
    return api.userApi({ url: "/users/getUserData",method: "POST",data: userData })
  },
  updateUserData:(customerName, phoneNumber, email, address) =>{
    //const signUpUserName = useSelector((appState: any) => appState.LoginReducer.signUpUserName);
    let userData = {
      "userToken" : localStorage.getItem('userToken'),
      "customerName" : customerName,
      "phoneNumber": phoneNumber,
      "email": email,
      "address": address
    }
    //console.log(_signUpUserName._username)
    console.log(userData)
    return api.userApi({ url: "/users/modifydata",method: "POST",data: userData })
  },
};

export default userApi;
