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
};

export default CustomerApi;
