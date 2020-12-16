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
  //console.log(goodsData);
  return (
    <div className={styles.container}>
      <div className={styles.container_goodsItemInfo}>
        <div className={styles.container_goodsItemInfo_imageContainer}><img
          className={styles.container_goodsItemInfo_imageContainer_img}
          src={goodsData.imgURL}
        ></img></div>
        <div className={styles.container_goodsItemInfo_dataContainer}>
          <div className={styles.container_goodsItemInfo_dataContainer_title}>
            {goodsData.name}
          </div>
          <div className={styles.container_goodsItemInfo_dataContainer_count}>
            x {goodsData.count}
          </div>
          <div className={styles.container_goodsItmePrice_text}>${goodsData.price}</div>
        </div>
      </div>
    </div>
  );
};

export default GoodsCard;
