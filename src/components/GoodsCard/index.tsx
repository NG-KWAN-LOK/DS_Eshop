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
    <Link to={{ pathname: "/items", search: "?goodsID=" + goodsData.id }}>
      <div className={styles.itemContainer}>
        <div className={styles.itemContainer_imageContainer}>
          <img
            className={styles.itemContainer_imageContainer_img}
            src={goodsData.imgURL}
          ></img>
        </div>
        <div className={styles.itemContainer_info}>
          <div className={styles.itemContainer_info_title}>
            {goodsData.name}
          </div>
          <div className={styles.itemContainer_info_price}>
            ${goodsData.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoodsCard;
