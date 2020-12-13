import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.scss";

import GoodsApi from "../../utils/api/apifetcher/goods";
import sellerApi from "../../utils/api/apifetcher/seller"
import CommentApi from "../../utils/api/apifetcher/goodsComment";

import useParams from 'Customhooks/useParams';
import Header from "../../components/Header/MainHeader";
import GoodsCommentCard from "../../components/goodsCommentCard";
import Loading from "../../components/PopUpLayer/Loading"

import * as loginActions from "../../containers/Login/actions";

import * as SearchActions from "./actions";
interface DashboardProps { }


const Item = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((appState: any) => appState.LoginReducer.isLogin);
  const { goodsID:id } =useParams({keys:["goodsID"]});
  const [goodsItemInfo, setGoodsItemInfo] = useState([]);
  const [goodsCommentInfo, setGoodsCommentInfo] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [commentContentIsBlank, setCommentContentIsBlank] = useState(true);
  const[isLoading, setIsloading] = useState(true);
  useEffect(() => {
    getGoodInfo()
    getCommentInfo()
  }, []);
  async function getGoodInfo(){
    await GoodsApi.getItemInfo(id)
    .then((res) => {
      console.log("success")
      console.log(res.data)
      setGoodsItemInfo(res.data)
    })
    .catch((err) => {
      console.log("fail")
    });
    setIsloading(false)
  }
  async function getCommentInfo(){
    await CommentApi.getCommentData()
    .then((res) => {
      //console.log(res);
      setGoodsCommentInfo(res);
    })
    .catch((err) => {
      console.log("error");
    });
  }
  const handleChangeNewCommentContent = (e) => {
    setNewCommentContent(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newCommentContent);
  };
  const handleChangeQuantity = (e) => {
    if (e.target.value > 0 || e.target.value === "")
      if (e.target.value === "") setQuantity(e.target.value);
      else setQuantity(e.target.value);
  };
  const handleChangeQuantityMins = () => {
    if (quantity > 1) setQuantity(Number(quantity) - 1);
  };
  const handleChangeQuantityPlus = () => {
    setQuantity(Number(quantity) + 1);
  };
  function callToAddShoppingCart(status) {
    console.log("call api");
    if (isLogin) {
      if (status == 1) {
        const path = "/ShoppingCart";
        history.push(path);
      }
      else if (status == 0) {
        console.log("add to shopping cary");
      }
    }
    else {
      const path = "/login";
      history.push(path);
    }
  }
  //console.log(goodsItemInfo);
  console.log(quantity);
  function chooseCommentMode() {
    if (isLogin == true) {
      return <form className={styles.commentContainer_body_desription_newComment} onSubmit={handleSubmit}>
        <textarea
          className={styles.commentContainer_body_desription_newComment_input}
          placeholder={"請輸入評語"}
          value={newCommentContent}
          onChange={handleChangeNewCommentContent}
        >
        </textarea>
        <input
          className={`${styles.loginContent_submitBtn} ${newCommentContent === "" ? styles.loginContent_submitBtn_not_allow : styles.loginContent_submitBtn_allow}`}
          type="submit"
          value="發表"
          disabled={newCommentContent === ""}
        />
      </form>
    }
    else {
      return <form className={styles.commentContainer_body_desription_newComment} onSubmit={handleSubmit}>
        <textarea
          className={styles.commentContainer_body_desription_newComment_input_not_allow}
          placeholder={"登入後才能發表評語"}
          value={newCommentContent}
          onChange={handleChangeNewCommentContent}
        >
        </textarea>
        <input
          className={`${styles.loginContent_submitBtn} ${newCommentContent === "" ? styles.loginContent_submitBtn_not_allow : styles.loginContent_submitBtn_allow}`}
          type="submit"
          value="發表"
          disabled={newCommentContent === ""}
        />
      </form>
    }
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.top_Padding}></div>
      <div className={styles.pageContainer}>
        <div className={styles.pageContainer_itemContainer}>
          <div className={styles.pageContainer_itemContainer_header}>
            <div className={styles.pageContainer_itemContainer_header_left}>
              <div
                className={
                  styles.pageContainer_itemContainer_header_left_imageContainer
                }
              >
                <img
                  className={
                    styles.pageContainer_itemContainer_header_left_imageContainer_img
                  }
                  src={goodsItemInfo.imgURL}
                ></img>
              </div>
            </div>
            <div className={styles.pageContainer_itemContainer_header_right}>
              <div
                className={
                  styles.pageContainer_itemContainer_header_right_itemTitle
                }
              >
                {goodsItemInfo.name}
              </div>
              <div
                className={
                  styles.pageContainer_itemContainer_header_right_priceContainer
                }
              >
                <div
                  className={
                    styles.pageContainer_itemContainer_header_right_priceContainer_priceTitle
                  }
                >
                  ${goodsItemInfo.price}
                </div>
              </div>
              <div
                className={
                  styles.pageContainer_itemContainer_header_right_optionContainer
                }
              >
                <div
                  className={
                    styles.pageContainer_itemContainer_header_right_optionContainer_title
                  }
                >
                  數量
                </div>
                <div
                  className={
                    styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity
                  }
                >
                  <input
                    type="button"
                    value="-"
                    className={
                      styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity_minus
                    }
                    onClick={handleChangeQuantityMins}
                  />
                  <input
                    type="number"
                    step={1}
                    min={0}
                    max=""
                    name="quantity"
                    value={quantity}
                    title="Qty"
                    className={
                      styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity_text
                    }
                    size={4}
                    pattern=""
                    onChange={handleChangeQuantity}
                  />
                  <input
                    type="button"
                    value="+"
                    className={
                      styles.pageContainer_itemContainer_header_right_optionContainer_content_inputQuantity_plus
                    }
                    onClick={handleChangeQuantityPlus}
                  />
                </div>
              </div>
              <div className={styles.pageContainer_itemContainer_header_right_btnContainer}>
                <div className={styles.pageContainer_itemContainer_header_right_btnContainer_addShoppingCart} onClick={() => callToAddShoppingCart(0)}>
                  加入購物車
                </div>
                <div className={styles.pageContainer_itemContainer_header_right_btnContainer_buyItNow} onClick={() => callToAddShoppingCart(1)}>
                  立即購買
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.bodyContainer_body}>
          <div className={styles.bodyContainer_body_desription}>
            <div className={styles.bodyContainer_body_desription_title}>
              商品詳情
              </div>
            <div className={styles.bodyContainer_body_desription_text}>
              {goodsItemInfo.description}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.commentContainer_body}>
          <div className={styles.commentContainer_body_desription}>
            <div className={styles.commentContainer_body_desription_title}>
              商品評價
            </div>
            {chooseCommentMode()}
            <div className={styles.commentContainer_body_desription_commentItem}>
              {goodsCommentInfo.map((data, index) => {
                return <GoodsCommentCard commentData={data} />;
              })}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Item;
