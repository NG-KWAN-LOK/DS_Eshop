import api from "../api";

const couponList = [
  {
    couponId: "0",
    couponName: "訂單減100元",
    discountContent: "100",
    startDate:"2020/12/18",
    endDate: "2020/12/30",
    isTook:true
  },
  {
    couponId: "1",
    couponName: "訂單減50元",
    discountContent: "50",
    startDate:"2020/12/18",
    endDate: "2021/01/02",
    isTook:false
  },
];

const CouponApi = {
  getCouponList: () => {
    return new Promise((resolve) => resolve(couponList));
  },
};

export default CouponApi;
