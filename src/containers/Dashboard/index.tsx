import React, { useEffect, useState } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./styles.scss";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

//import styles from "./styles.scss";

import Header from "../../components/Header/MainHeader";
import GoodsCard from "../../components/GoodsCard";
import CouponCard from "../../components/CouponCard";
import DivLoading from "../../components/PopUpLayer/DivLoading";
import Alert from "../../components/PopUpLayer/Alert";

import banner1 from "../../image/1608418919930.jpg";
import banner2 from "../../image/1608692935739.jpg";

import GoodsApi from "../../utils/api/apifetcher/goods";
import CouponApi from "../../utils/api/apifetcher/coupon";

interface DashboardProps { }

const Dashboard = () => {
  let bannerImgList = [
    {
      //url : "../../image/banner/1608418919930.jpg"
      url: banner1,
    },
    {
      url: banner2,
    },
    {
      url:
        "https://www.mesa-africa.org/wp-content/uploads/2016/06/beijing-1200x400.jpg",
    },
    {
      url:
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/DiamondValleyNV.jpg",
    },
  ];
  const [goodsList, getGoodsList] = useState([]);
  const [couponList, getCouponList] = useState([]);
  const [isLoadingHotList, setIsloadingHotList] = useState(true);
  const [isLoadingCouponList, setIsloadingCouponList] = useState(true);

  useEffect(() => {
    GoodsApi.getHotsalesGoods()
      .then((res) => {
        //console.log(res);
        getGoodsList(res.data);
        setIsloadingHotList(false);
      })
      .catch((err) => {
        console.log("error");
      });
    CouponApi.getCouponList()
      .then((res) => {
        //console.log(res);
        getCouponList(res);
        setIsloadingCouponList(false);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  console.log(bannerImgList);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.top_Padding}></div>
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <div className={styles.pageContainer_TopContainer}>
            <div className={styles.pageContainer_TopContainer_banner}>
              <Swiper
                height={400}
                width={1200}
                spaceBetween={50}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className={styles.pageContainer_TopContainer_banner_content}
              >
                {bannerImgList.map((data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {
                        <div
                          className={
                            styles.pageContainer_TopContainer_banner_slide
                          }
                        >
                          <img src={data.url}></img>
                        </div>
                      }
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className={styles.pageContainer_couponItemContainer}>
            <div className={styles.pageContainer_couponItemContainer_block}>
              <div
                className={
                  styles.pageContainer_couponItemContainer_block_header
                }
              >
                <span
                  className={
                    styles.pageContainer_couponItemContainer_block_header_text
                  }
                >
                  領取優惠券
                </span>
              </div>
              <Swiper
                height={309}
                width={1200}
                spaceBetween={10}
                slidesPerView={6}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className={styles.pageContainer_couponItemContainer_content}
              >
                {couponList.map((data, index) => {
                  return (
                    <SwiperSlide
                      key={data.id}
                      className={
                        styles.pageContainer_couponItemContainer_content_item
                      }
                    >
                      <CouponCard key={data.id} couponData={data} />
                    </SwiperSlide>
                  );
                })}
                {isLoadingCouponList && <DivLoading />}
              </Swiper>
            </div>
          </div>
          <div className={styles.pageContainer_hotItemContainer}>
            <div className={styles.pageContainer_hotItemContainer_block}>
              <div
                className={styles.pageContainer_hotItemContainer_block_header}
              >
                <span
                  className={
                    styles.pageContainer_hotItemContainer_block_header_text
                  }
                >
                  熱門商品
                </span>
              </div>
              <div className={styles.pageContainer_hotItemContainer_block_item}>
                {goodsList.map((data, index) => {
                  return <GoodsCard key={data.id} goodsData={data} />;
                })}
                {isLoadingHotList && <DivLoading />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
