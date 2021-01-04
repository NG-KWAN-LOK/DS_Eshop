import React, { useMemo ,useEffect,useState} from "react";
import { Link } from "react-router-dom";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";
import GoodsApi from "../../../../utils/api/apifetcher/goods";
import Loading from "../../../PopUpLayer/Loading"
import Alert from "../../../PopUpLayer/Alert"

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
  const [isLoading, setIsloading] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [goodsInfo, getGoodsInfo] = useState("");
  useEffect(() => {
    getItemInfo();
  }, []);
  function getItemInfo() {
    GoodsApi.getItemInfo(goodsData.item_id)
      .then((res) => {
        //console.log(res.data);
        const newData = res.data;
        getGoodsInfo(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("fail");
        setIsloading(false);
        setIsErrorAlert(true);
      });
  }
  //console.log(goodsData,goodsInfo);
  return (
    <div className={styles.container}>
      <div className={styles.container_goodsItemInfo}>
        <div className={styles.container_goodsItemInfo_imageContainer}><img
          className={styles.container_goodsItemInfo_imageContainer_img}
          src={goodsInfo.imgURL}
        ></img></div>
        <div className={styles.container_goodsItemInfo_dataContainer}>
        <div className={styles.container_goodsItemInfo_dataContainer_title}>
            賣家：{goodsInfo.name}
          </div>
          <div className={styles.container_goodsItemInfo_dataContainer_title}>
            {goodsInfo.name}
          </div>
          <div className={styles.container_goodsItemInfo_dataContainer_count}>
            x {goodsData.items_quantity}
          </div>
        </div>
      </div>
      <div className={styles.container_goodsItmePrice}>
        <div className={styles.container_goodsItmePrice_text}>${goodsInfo.price}</div>
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && <Alert type={"error"} content={"失敗"} setIsDisplayState={() => { setTimeout(() => { console.log("delay"); setIsErrorAlert(false); }, 2000); }} />}
    </div>
  );
};

export default GoodsCard;
