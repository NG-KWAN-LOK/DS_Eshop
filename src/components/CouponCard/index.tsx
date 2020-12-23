import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import logo from "../../image/coupon.png"

import ImageLoading from "../../components/PopUpLayer/ImageLoading";

// const ArtistLink = ({ audioData, customClass = undefined, children }) => {
//   {
//     return audioData.artist.length === 1 ? (
//       <Link
//         to={PATH.getArtistLink(audioData.artist[0].id)}
//         className={customClass}
//       >
//         {children}
//       </Link>
//     ) : (
//         <AudioLink id={audioData.id} customClass={customClass}>
//           {children}
//         </AudioLink>
//       );
//   }
// };

const CouponCard = ({ couponData }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  const [imageLoaded, setImageLoaded] = useState(false);
  console.log(couponData);
  function takeCoupon() {
    console.log("takeCoupon")
  }
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemContainer_imageContainer}>
        <img
          className={styles.itemContainer_imageContainer_img}
          src={logo} onLoad={() => setImageLoaded(true)}
        ></img>
        {!imageLoaded && <ImageLoading />}
      </div>
      <div className={styles.itemContainer_info}>
        <div className={styles.itemContainer_info_title}>
          {couponData.couponName}
        </div>
        <div className={styles.itemContainer_info_expdate}>
          有效期期效 {couponData.endDate}
        </div>
        <div className={styles.itemContainer_info_footer}>
          {couponData.isTook == false ? <div className={styles.itemContainer_info_footer_btn_notTook} onClick={takeCoupon}>
            領取
            </div> :
            <div className={styles.itemContainer_info_footer_btn_isTook} onClick={takeCoupon}>
              已領取
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
