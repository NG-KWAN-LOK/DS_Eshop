import React, { useCallback, useRef, useState, useEffect } from "react";
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

const GoodsCard = ({ data }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  const [goodsData, setGoodsList] = useState(data);
  console.log(goodsData, data);
  function cancelGood() {
    console.log("cancelGood" + goodsData.id)
  }
  function setIsDisplay() {
    if (goodsData.isDisplay === "true") {
      console.log("set notDisplay")
      data.isDisplay = "false";
      setGoodsList(data)
    }
    else {
      console.log("set display")
      data.isDisplay = "true";
      setGoodsList(data)
    }
  }
  return (
    <div className={styles.productGoodsItemContainer}>
      <div className={styles.productGoodsItemContainer_goodsName}>
        <div className={styles.productGoodsItemContainer_goodsName_imageContainer}><img
          className={styles.productGoodsItemContainer_goodsName_imageContainer_img}
          src={goodsData.imgURL}
        ></img></div>
        <span>{goodsData.name}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsPrice}>
        <span>${goodsData.price}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsStock}>
        <span>{goodsData.stock}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsControl}>
        <Link to={{ pathname: "/seller/editGoods", search: "?goodsID=" + goodsData.id }}><div className={styles.productGoodsItemContainer_goodsControl_text}>編輯</div></Link>
        <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={cancelGood}>刪除</div>
        {goodsData.isDisplay === "false" && <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={setIsDisplay}>上架</div>}
        {goodsData.isDisplay === "true" && <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={setIsDisplay}>下架</div>}
      </div>
    </div>
  );
};

export default GoodsCard;
