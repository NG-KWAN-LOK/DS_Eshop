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
        <div className={styles.productGoodsItemContainer_sellerBlock_header}>
          <div className={styles.productGoodsItemContainer_sellerBlock_header_sellerUserName}>
            <div className={styles.productGoodsItemContainer_sellerBlock_header_sellerUserName_icon}>
            </div>{cartData.sellerUserName}
          </div>
        </div>
        <div className={styles.productGoodsItemContainer_sellerBlock_goodsList}>
          {cartData.goodsList.map((data, index) => {
            return <ShoppingCartGoodsItems key={data.goodId} goodsData={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
