import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link,useHistory, } from "react-router-dom";
import { useSelector } from "react-redux";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import sellerApi from "../../../../utils/api/apifetcher/seller"
import Loading from "../../../PopUpLayer/Loading"
import Confirm from "../../../PopUpLayer/ConfirmAlert"

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
  const history = useHistory();
  const userToken = useSelector((appState: any) => appState.LoginReducer.userData.userToken);
  const [goodsData, setGoodsList] = useState(data);
  const [isLoading, setIsloading] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isDownConfrimAlert, setIsDownConfrimAlert] = useState(false);
  console.log(goodsData, data);
  async function cancelGood() {
    console.log("cancelGood" + goodsData.id)
    setIsloading(true)
    await sellerApi.deleteItem(goodsData.id)
      .then((res) => {
        console.log("success")
        setIsloading(false)
        setIsCancel(true)
      })
      .catch((err) => {
        console.log("fail")
        setIsloading(false)
      });
  }
  function setIsDisplay() {
    if (goodsData.isDisplay == 1) {
      console.log("set notDisplay")
      data.isDisplay = 0;
      setIsDownConfrimAlert(true)
      setGoodsList(data)
    }
    else {
      console.log("set display")
      data.isDisplay = 1;
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
        {goodsData.isDisplay == 0 && <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={setIsDisplay}>上架</div>}
        {goodsData.isDisplay == 1 && <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={setIsDisplay}>下架</div>}
      </div>
      {isDownConfrimAlert && <Confirm title={"您確定要下架此商品?"} content={"商品下架後，買家將無法搜尋和購買您的商品。"}/>}
      {isLoading && <Loading />}
    </div>
  );
};

export default GoodsCard;
