import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import PATH from "Utils/pathConst";
import styles from "./styles.scss";

import adminApi from "../../../../utils/api/apifetcher/admin";
import Loading from "../../../PopUpLayer/Loading";
import Confirm from "../../../PopUpLayer/ConfirmAlert";

const GoodsCard = ({ data, getMembereAPI }) => {
  // const artistName = useMemo(() => {
  //   return audioData.artist.map((artist) => artist.name).join(", ");
  // }, [audioData]);
  const history = useHistory();
  const [memberData, setMemberList] = useState(data);
  const [isLoading, setIsloading] = useState(false);
  const [isCancelConfrimAlert, setIsCancelConfrimAlert] = useState(false);
  console.log(memberData, data);
  function cancelMember() {
    console.log("cancelMember" + memberData.id);
    setIsloading(true);
    adminApi
      .deleteMember(memberData.id)
      .then((res) => {
        console.log("success");
        getMembereAPI();
      })
      .catch((err) => {
        console.log("fail");
        setIsloading(false);
      });
  }
  return (
    <div className={styles.productGoodsItemContainer}>
      <div className={styles.productGoodsItemContainer_userName}>
        <span>{memberData.userName}</span>
      </div>
      <div className={styles.productGoodsItemContainer_customerName}>
        <span>{memberData.customerName}</span>
      </div>
      <div className={styles.productGoodsItemContainer_phoneNumber}>
        <span>{memberData.phoneNumber}</span>
      </div>
      <div className={styles.productGoodsItemContainer_email}>
        <span>{memberData.email}</span>
      </div>
      <div className={styles.productGoodsItemContainer_address}>
        <span>{memberData.address}</span>
      </div>
      <div className={styles.productGoodsItemContainer_createTime}>
        <span>{memberData.createTime}</span>
      </div>
      <div className={styles.productGoodsItemContainer_goodsControl}>
        <Link
          to={{
            pathname: "/admin/editMember",
            search: "?memberID=" + memberData.id,
          }}
        >
          <div className={styles.productGoodsItemContainer_goodsControl_text}>
            編輯
          </div>
        </Link>
        <div
          className={styles.productGoodsItemContainer_goodsControl_text}
          onClick={() => setIsCancelConfrimAlert(true)}
        >
          刪除
        </div>
      </div>
      {isCancelConfrimAlert && (
        <Confirm
          title={"您確定要刪除此用戶?"}
          content={
            "用戶刪除後，該用戶上傳的商品、購物車及用戶資料將會刪除，不能回復。"
          }
          onCancel={() => {
            setIsCancelConfrimAlert(false);
          }}
          onConfirm={() => {
            cancelMember();
          }}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default GoodsCard;
