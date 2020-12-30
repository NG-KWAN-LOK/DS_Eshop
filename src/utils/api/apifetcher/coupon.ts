import api from "../api";

const couponList = [
  {
    couponName: "TEST1",
    discountContent: "100",
    startDate: "2020/12/18",
    endDate: "2020/12/30",
    createAt: "2020/12/29"
  },
  {
    couponName: "TEST2",
    discountContent: "50",
    startDate: "2020/12/18",
    endDate: "2021/01/02",
    createAt: "2020/12/29"
  },
];

const CouponApi = {
  // getCouponList: () => {
  //   return new Promise((resolve) => resolve(couponList));
  // },
  getCouponList: () => {
    return api.userApi({
      url: "/coupon/getAll", method: "GET", params: {
      },
    })
  },
  getCouponInfoByName: (couponName) => {
    let userData = {
      "couponName": couponName,
    }
    return api.userApi({ url: "/coupon/getbyname", method: "POST", data: userData })
  },
};

export default CouponApi;
