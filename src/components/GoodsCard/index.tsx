import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

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

const GoodsCard = ({ goodsData }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  //console.log(goodsData);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Link to={{ pathname: "/items", search: "?goodsID=" + goodsData.id }}>
      <div className={styles.itemContainer}>
        <div className={styles.itemContainer_imageContainer}>
          <img
            className={styles.itemContainer_imageContainer_img}
            src={goodsData.imgURL}
            onLoad={() => setImageLoaded(true)}
          ></img>
          {!imageLoaded && <ImageLoading />}
        </div>
        <div className={styles.itemContainer_info}>
          <div className={styles.itemContainer_info_top}>
            <div className={styles.itemContainer_info_top_title}>
              {`${goodsData.name.substring(0, 30)}${goodsData.name.length > 30 ? "..." : ""}`}
            </div>
            <div className={styles.itemContainer_info_top_price}>
              ${goodsData.price}
            </div>
          </div>
          <div className={styles.itemContainer_info_footer}>
            <div className={styles.itemContainer_footer_sales}>
              已售出 {goodsData.sales}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoodsCard;
