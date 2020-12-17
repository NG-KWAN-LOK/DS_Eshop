import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link,useHistory, } from "react-router-dom";
import { useSelector } from "react-redux";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import sellerApi from "../../../../utils/api/apifetcher/seller"
import Loading from "../../../PopUpLayer/Loading"
import Confirm from "../../../PopUpLayer/ConfirmAlert"
import Alert from "../../../PopUpLayer/Alert"


const GoodsCard = ({ data, getGoodsAPI }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  const history = useHistory();
  const [isLoading, setIsloading] = useState(false);
  const [isCancelConfrimAlert, setIsCancelConfrimAlert] = useState(false);
  const [isDownConfrimAlert, setIsDownConfrimAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  console.log(data)
  function cancelGood() {
    console.log("cancelGood" + data.id)
    setIsloading(true)
    sellerApi.deleteItem(data.id)
      .then((res) => {
        console.log("success")
        getGoodsAPI();
      })
      .catch((err) => {
        console.log("fail")
        setIsErrorAlert(true)
        setIsloading(false)
      });
  }
  async function setIsDisplay() {
    // const newData = {...goodsData,isDisplay : 1};
    console.log(data.isDisplay);
    setIsloading(true)
    sellerApi.setDisplayStatus(data.id, data.isDisplay? false:true)
      .then((res) => {
        console.log("success")
        getGoodsAPI();
        setIsloading(false)
      })
      .catch((err) => {
        console.log("fail")
        setIsloading(false)
        setIsErrorAlert(true)
      });
  }
  return (
    <div className={styles.productGoodsItemContainer}>
      <div className={styles.productGoodsItemContainer_goodsName}>
        <div className={styles.productGoodsItemContainer_goodsName_imageContainer}><img
          className={styles.productGoodsItemContainer_goodsName_imageContainer_img}
          src={data.imgURL}
        ></img></div>
        <Link to={{ pathname: "/items", search: "?goodsID=" + data.id }}><span className={styles.productGoodsItemContainer_goodsName_text}>{data.name}</span></Link>
      </div>
      <div className={styles.productGoodsItemContainer_goodsPrice}>
        <span>${data.price}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsStock}>
        <span>{data.stock}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsControl}>
        <Link to={{ pathname: "/seller/editGoods", search: "?goodsID=" + data.id }}><div className={styles.productGoodsItemContainer_goodsControl_text}>編輯</div></Link>
        <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={() =>setIsCancelConfrimAlert(true)}>刪除</div>
        {data.isDisplay == false ? <div className={styles.productGoodsItemContainer_goodsControl_text} onClick={setIsDisplay}>上架</div>:<div className={styles.productGoodsItemContainer_goodsControl_text} onClick={() =>setIsDownConfrimAlert(true)}>下架</div>}
      </div>
      {isDownConfrimAlert && <Confirm title={"您確定要下架此商品?"} content={"商品下架後，買家將無法搜尋和購買您的商品。"} onCancel ={()=>{setIsDownConfrimAlert(false)}} onConfirm ={()=>{setIsDisplay();setIsDownConfrimAlert(false)}}/>}
      {isCancelConfrimAlert && <Confirm title={"您確定要刪除此商品?"} content={"商品刪除後，便不能再回復。"} onCancel ={()=>{setIsCancelConfrimAlert(false)}} onConfirm ={()=>{cancelGood();}}/>}
      {isLoading && <Loading />}
      {isErrorAlert && <Alert type={"error"} content={"失敗"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default GoodsCard;
