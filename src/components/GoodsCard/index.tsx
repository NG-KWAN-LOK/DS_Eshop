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

const GoodsCard = () => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemContainer_imageContainer}>
        <img className={styles.itemContainer_imageContainer_img} src="https://attach.setn.com/newsimages/2020/04/28/2527272-XXL.jpg"></img>
      </div>
      <div className={styles.itemContainer_info}>
        <div className={styles.itemContainer_info_title}>屌你老母</div>
        <div className={styles.itemContainer_info_price}>$9999</div>
      </div>
    </div>
  );
};

export default GoodsCard;
