import React, { useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import ShoppingCartGoodsItems from "../ShoppingCartGoodsList";
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

const CartCard = ({ cartData }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  //console.log(cartData);
  return (
    <div className={styles.productGoodsItemContainer}>
      <div className={styles.productGoodsItemContainer_sellerBlock}>
        {cartData.goodsList.map((data, index) => {
          return <ShoppingCartGoodsItems key={data.goodId} goodsData={data} />;
        })}
      </div>
    </div>
  );
};

export default CartCard;
