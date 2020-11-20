import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

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
  console.log(goodsData);
  return (
    <div className={styles.productGoodsItemContainer}>
      <div className={styles.productGoodsItemContainer_goodsName}>
        <div className={styles.productGoodsItemContainer_goodsName_imageContainer}><img
          className={styles.productContainer_productHeader_porductName_imageContainer_img}
          src={goodsData.imgURL}
        ></img></div>
        <span>{goodsData.name}</span>
      </div>
      <div className={styles.productContainer_productHeader_unitPrice}>
        <span>${goodsData.price}</span>
      </div>
      <div className={styles.productContainer_productHeader_count}>
        <span>{goodsData.stock}</span>
      </div>
      <div className={styles.productContainer_productHeader_totalPrice}>
        <span>{goodsData.stock}</span>
      </div>
      <div className={styles.productContainer_productHeader_action}>
        <div className={styles.productContainer_productHeader_action_text}>刪除</div>
      </div>
    </div>
  );
};

export default GoodsCard;
