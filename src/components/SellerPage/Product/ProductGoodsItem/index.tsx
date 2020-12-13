import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link,useHistory, } from "react-router-dom";
import { useSelector } from "react-redux";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import sellerApi from "../../../../utils/api/apifetcher/seller"
import Loading from "../../../PopUpLayer/Loading"
import Confirm from "../../../PopUpLayer/ConfirmAlert"

const GoodsCard = ({ data, getGoodsAPI }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  const history = useHistory();
  const [goodsData, setGoodsList] = useState(data);
  const [isLoading, setIsloading] = useState(false);
  const [isCancelConfrimAlert, setIsCancelConfrimAlert] = useState(false);
  const [isDownConfrimAlert, setIsDownConfrimAlert] = useState(false);
  //console.log(goodsData, data);
  function cancelGood() {
    console.log("cancelGood" + goodsData.id)
    setIsloading(true)
    sellerApi.deleteItem(goodsData.id)
      .then((res) => {
        console.log("success")
        getGoodsAPI();
      })
      .catch((err) => {
        console.log("fail")
        setIsloading(false)
      });
  }
  function setIsDisplay() {
    if (goodsData.isDisplay == 1) {
      const newData = {...goodsData,isDisplay : 0};
      setGoodsList(newData)
      console.log("set notDisplay", goodsData.isDisplay)
    }
    else {
      const newData = {...goodsData,isDisplay : 1};
      setGoodsList(newData)
      console.log("set display", goodsData.isDisplay)
    }
    //setGoodsList({...goodsData,isDisplay:goodsData.isDisplay===1?0:1});
  }
  return (
    <div className={styles.productGoodsItemContainer}>
      <div className={styles.productGoodsItemContainer_goodsName}>
        <div className={styles.productGoodsItemContainer_goodsName_imageContainer}><img
          className={styles.productGoodsItemContainer_goodsName_imageContainer_img}
          src={goodsData.imgURL}
        ></img></div>
        <Link to={{ pathname: "/items", search: "?goodsID=" + goodsData.id }}><span className={styles.productGoodsItemContainer_goodsName_text}>{goodsData.name}</span></Link>
      </div>
      <div className={styles.productGoodsItemContainer_goodsPrice}>
        <span>${goodsData.price}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsStock}>
        <span>{goodsData.stock}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsControl}>
        <Link to={{ pathname: "/seller/editGoods", search: "?goodsID=" + goodsData.id }}><div className={styles.productGoodsItemContainer_goodsControl_text}>編輯</div></Link>
        <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={() =>setIsCancelConfrimAlert(true)}>刪除</div>
        {goodsData.isDisplay == 0 ? <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={setIsDisplay}>上架</div>:<div className={styles.productGoodsItemContainer_goodsControl_text} onClick={() =>setIsDownConfrimAlert(true)}>下架</div>}
      </div>
      {isDownConfrimAlert && <Confirm title={"您確定要下架此商品?"} content={"商品下架後，買家將無法搜尋和購買您的商品。"} onCancel ={()=>{setIsDownConfrimAlert(false)}} onConfirm ={()=>{setIsDisplay();setIsDownConfrimAlert(false)}}/>}
      {isCancelConfrimAlert && <Confirm title={"您確定要刪除此商品?"} content={"商品刪除後，便不能再回復。"} onCancel ={()=>{setIsCancelConfrimAlert(false)}} onConfirm ={()=>{cancelGood();}}/>}
      {isLoading && <Loading />}
    </div>
  );
};

export default GoodsCard;
