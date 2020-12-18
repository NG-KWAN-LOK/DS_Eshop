import React, { useMemo,useState } from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import Loading from "../../../components/PopUpLayer/Loading"

import ShoppingCartApi from "../../../utils/api/apifetcher/shoppingCart"
import Alert from "../../PopUpLayer/Alert"


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

const GoodsCard = ({ goodsData , getGoodsAPI}) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  const [isLoading, setIsloading] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  function countTotalPrice() {
    let totalPrice = parseInt(goodsData.count) * parseInt(goodsData.price)
    return totalPrice
  }
  function cancelGood(){
    console.log("cancelGood" + goodsData.id)
    setIsloading(true)
    ShoppingCartApi.deleteShoppingCartItem(goodsData.goodId)
      .then((res) => {
        console.log("success",res)
        getGoodsAPI();
        setIsloading(false)
      })
      .catch((err) => {
        console.log("fail")
        setIsErrorAlert(true)
        setIsloading(false)
      });
  }
  return (
    <div className={styles.productGoodsItemContainer}>
      <div className={styles.productGoodsItemContainer_goodsName}>
        <div className={styles.productGoodsItemContainer_goodsName_imageContainer}><img
          className={styles.productContainer_productHeader_porductName_imageContainer_img}
          src={goodsData.imgURL}
        ></img></div>
        <Link to={{ pathname: "/items", search: "?goodsID=" + goodsData.goodId }}><span className={styles.productGoodsItemContainer_goodsName_text}>{goodsData.name}</span></Link>
      </div>
      <div className={styles.productContainer_productHeader_unitPrice}>
        <span>${goodsData.price}</span>
      </div>
      <div className={styles.productContainer_productHeader_count}>
        <span>{goodsData.count}</span>
      </div>
      <div className={styles.productContainer_productHeader_totalPrice}>
        <span>${countTotalPrice()}</span>
      </div>
      <div className={styles.productContainer_productHeader_action}>
        <div className={styles.productContainer_productHeader_action_text} onClick={cancelGood}>刪除</div>
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && <Alert type={"error"} content={"失敗"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default GoodsCard;
