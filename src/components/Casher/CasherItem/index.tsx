import React, { useMemo,useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import CasherGoodsItem from "../CasherGoodsItem"

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
  const [sellerTotalPrice, setSellerTotalPrice] = useState(0);
  console.log(cartData);
  function countTotalGoods() {
    var totalGoods = 0;
    cartData.goodsList.forEach(goodsData => {
      totalGoods += parseInt(goodsData.count)
    })
    return totalGoods
  }
  function countTotalPrice() {
    var totalPrice = 0;
    var sellerTotalPrice = 0;
    cartData.goodsList.forEach(goodsData => {
      sellerTotalPrice += parseInt(goodsData.count) * parseInt(goodsData.price)
    })
    totalPrice += sellerTotalPrice
    return totalPrice
  }
  return (
    <div className={styles.productSellerItemContainer}>
      <div className={styles.productSellerItemContainer_header}>
        <div className={styles.productSellerItemContainer_header_sellerUserName}>
          <div className={styles.productSellerItemContainer_header_sellerUserName_icon}>
          </div>{cartData.sellerUserName}
        </div>
      </div>
      <div className={styles.productSellerItemContainer_goodsList}>
        {cartData.goodsList.map((data, index) => {
          return <CasherGoodsItem key={data.goodId} goodsData={data}/>;
        })}
      </div>
      <div className={styles.productSellerItemContainer_footer}>
        <div className={styles.productSellerItemContainer_footer_totalGoods}>
        訂單金額({countTotalGoods()}商品):
        </div>
        <div className={styles.productSellerItemContainer_footer_totalPrice}>
          ${countTotalPrice()}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
