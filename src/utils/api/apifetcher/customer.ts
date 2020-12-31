import api from "../api";

const userData = [
  {
    userToken: "1234",
    userName: "fuckyou",
    customerName: "陳大明",
    phoneNumber: "0912345678",
    email: "fuckyou@gmail.com",
    address: "台北市中正區忠孝東路二段10號",
  },
];

const CustomerApi = {
  getUserData: () => {
    return new Promise((resolve) => resolve(userData));
  },

  getOrdersList: () => {
    let userData = {
      "userToken": localStorage.getItem('userToken'),
    }
    console.log(userData)
    return api.userApi({ url: "/buyermenu/getmyorders", method: "POST", data: userData })
  },
};

export default CustomerApi;
