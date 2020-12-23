import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.scss";

import GoodsApi from "../../utils/api/apifetcher/goods";
import NotFoundLogo from "../../image/magnifying-glass.svg";

import { getParams } from "../../utils/tools";
import Header from "../../components/Header/MainHeader";
import GoodsCard from "../../components/GoodsCard";
import Loading from "../../components/PopUpLayer/Loading";
import Alert from "../../components/PopUpLayer/Alert";

import { categoryList } from "Utils/constants";
import useSearch from "./useSearch";
interface DashboardProps {}

interface location {
  pathname: string;
  search: string;
}

const Search = () => {
  const location: location = useLocation();
  const history = useHistory();
  const { pathname, search } = location;
  const { paramters, updateParameter } = useSearch();
  const [goodsList, getGoodsList] = useState([]);
  const hotGoodsList = useSelector(
    (appState: any) => appState.DashboardReducer.hotGoodList
  );
  const [goodsCetogoryList, setGoodsCetogoryList] = useState("");
  const [goodsCetogorySelect, setGoodsCetogorySelect] = useState("");
  const [inputMinPrice, setInputMinPrice] = useState("");
  const [inputMaxPrice, setInputMaxPrice] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [inputIsError, setInuptIsError] = useState(false);

  function searchGoods() {
    setIsloading(true);
    const {
      keyword,
      orderBy,
      orderByKeyword,
      category,
      minPrice,
      maxPrice,
    } = paramters;
    GoodsApi.searchGoods(
      keyword,
      orderBy,
      orderByKeyword,
      category,
      minPrice,
      maxPrice
    )
      .then((res) => {
        //console.log(res);
        const newData = res.data;
        getGoodsList(newData);
        let newCetogory = new Set();
        if (newData.length !== 0) {
          newData.forEach((item) => {
            newCetogory.has(item.category)
              ? newCetogory.add(item.category)
              : newCetogory.add(item.category);
          });
          setGoodsCetogoryList(newCetogory);
        }
        setIsloading(false);
      })
      .catch((err) => {
        console.log("error");
        setIsloading(false);
        setIsErrorAlert(true);
      });
  }
  console.log(goodsList, goodsCetogoryList);

  useEffect(() => {
    searchGoods();
  }, [paramters]);
  function setSortingMethon(mode, orderMode = "asc") {
    updateParameter({ orderBy: orderMode, orderByKeyword: mode });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputMinPrice, inputMaxPrice);
    if (
      (!inputMinPrice && !inputMaxPrice) ||
      parseInt(inputMaxPrice) < parseInt(inputMinPrice)
    ) {
      console.log("false");
      setInuptIsError(true);
    } else {
      console.log("true");
      updateParameter({ minPrice: inputMinPrice, maxPrice: inputMaxPrice });
      setInuptIsError(false);
    }
  };
  const handleChangeRadios = (event) => {
    updateParameter({ category: event.target.value });
    setGoodsCetogorySelect(event.target.value);
  };
  const handleChangeMinPrice = (e) => {
    const numberExpression = /^[0-9]*$/;
    if (e.target.value && !numberExpression.test(e.target.value)) {
      return;
    }
    setInputMinPrice(e.target.value);
  };
  const handleChangeMaxPrice = (e) => {
    setInputMaxPrice(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.top_Padding}></div>
      <div className={styles.pageContainer}>
        <div className={styles.pageContainer_searchContainer}>
          {!isLoading ? (
            goodsList.length != 0 ? (
              <div className={styles.pageContainer_searchContainer_main}>
                <div className={styles.pageContainer_searchContainer_left}>
                  <div
                    className={
                      styles.pageContainer_searchContainer_left_filterBar
                    }
                  >
                    條件篩選
                  </div>
                  <div
                    className={
                      styles.pageContainer_searchContainer_left_filterContainer
                    }
                  >
                    <div
                      className={
                        styles.pageContainer_searchContainer_left_filterContainer_filterRow
                      }
                    >
                      <div
                        className={
                          styles.pageContainer_searchContainer_left_filterContainer_filterRow_title
                        }
                      >
                        分類
                      </div>
                      <div
                        className={
                          styles.PageContainer_searchContainer_left_filterContainer_filterRow_interContainerBlock
                        }
                      >
                        {Array.from(goodsCetogoryList).map((data, index) => {
                          return (
                            <span
                              className={
                                styles.PageContainer_searchContainer_left_filterContainer_filterRow_interContainerBlock_item
                              }
                              key={index}
                            >
                              <input
                                type="radio"
                                value={data}
                                name="category"
                                checked={goodsCetogorySelect === data}
                                onChange={(e) => {
                                  handleChangeRadios(e);
                                }}
                              />{" "}
                              {data}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      styles.pageContainer_searchContainer_left_filterContainer
                    }
                  >
                    <div
                      className={
                        styles.pageContainer_searchContainer_left_filterContainer_filterRow
                      }
                    >
                      <div
                        className={
                          styles.pageContainer_searchContainer_left_filterContainer_filterRow_title
                        }
                      >
                        價格範圍
                      </div>
                      <form
                        className={
                          styles.PageContainer_searchContainer_left_filterContainer_filterRow_interContainerBlock
                        }
                        onSubmit={handleSubmit}
                      >
                        <div
                          className={
                            styles.PageContainer_searchContainer_left_filterContainer_filterRow_interContainer_inputCol
                          }
                        >
                          <input
                            className={styles.loginContent_inputBar}
                            type="text"
                            placeholder={"$最小值"}
                            value={inputMinPrice}
                            onChange={handleChangeMinPrice}
                          />
                          <div
                            className={
                              styles.PageContainer_searchContainer_left_filterContainer_filterRow_interContainer_inputCol_line
                            }
                          ></div>
                          <input
                            className={styles.loginContent_inputBar}
                            type="text"
                            placeholder={"$最大值"}
                            value={inputMaxPrice}
                            onChange={handleChangeMaxPrice}
                          />
                        </div>
                        {inputIsError && (
                          <div
                            className={
                              styles.PageContainer_searchContainer_left_filterContainer_filterRow_interContainer_inputCol_errorMessage
                            }
                          >
                            請輸入有效的價格範圍
                          </div>
                        )}
                        <div
                          className={
                            styles.PageContainer_searchContainer_left_filterContainer_filterRow_interContainer_submitCol
                          }
                        >
                          <input
                            className={styles.loginContent_submitBtn}
                            type="submit"
                            value="套用"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className={styles.pageContainer_searchContainer_right}>
                  <div
                    className={
                      styles.pageContainer_searchContainer_searchResultText
                    }
                  >
                    '
                    <span
                      className={
                        styles.pageContainer_searchContainer_searchResultText_heightLight
                      }
                    >
                      {paramters.keyword}
                    </span>
                    '搜尋結果
                  </div>
                  <div
                    className={styles.pageContainer_searchContainer_sortingBar}
                  >
                    <div
                      className={
                        styles.pageContainer_searchContainer_sortingBar_text
                      }
                    >
                      篩選
                    </div>
                    {paramters.orderByKeyword === "name" ? (
                      <div
                        className={
                          styles.pageContainer_searchContainer_sortingBar_btn_isSelect
                        }
                      >
                        名稱
                      </div>
                    ) : (
                      <div
                        className={
                          styles.pageContainer_searchContainer_sortingBar_btn_notSelect
                        }
                        onClick={() => setSortingMethon("name")}
                      >
                        名稱
                      </div>
                    )}
                    {paramters.orderByKeyword === "sales" ? (
                      <div
                        className={
                          styles.pageContainer_searchContainer_sortingBar_btn_isSelect
                        }
                      >
                        最熱銷
                      </div>
                    ) : (
                      <div
                        className={
                          styles.pageContainer_searchContainer_sortingBar_btn_notSelect
                        }
                        onClick={() => setSortingMethon("sales")}
                      >
                        最熱銷
                      </div>
                    )}
                    <div
                      className={
                        styles.pageContainer_searchContainer_sortingBar_sortPrice
                      }
                    >
                      <div
                        className={
                          styles.pageContainer_searchContainer_sortingBar_sortPrice_subtitle
                        }
                      >
                        <span
                          className={
                            paramters.orderByKeyword === "price"
                              ? styles.pageContainer_searchContainer_sortingBar_sortPrice_text_isSelect
                              : styles.pageContainer_searchContainer_sortingBar_sortPrice_text_notSelect
                          }
                        >
                          價格：
                          {paramters.orderByKeyword === "price"
                            ? paramters.orderBy === "asc"
                              ? "低至高"
                              : "高至低"
                            : ""}
                        </span>
                        <span
                          className={
                            styles.pageContainer_searchContainer_sortingBar_sortPrice_arrow
                          }
                        ></span>
                      </div>
                      <div
                        className={
                          styles.pageContainer_searchContainer_sortingBar_sortPrice_under
                        }
                      >
                        <div
                          className={
                            styles.pageContainer_searchContainer_sortingBar_sortPrice_under_subtitle
                          }
                          onClick={() => setSortingMethon("price", "asc")}
                        >
                          <span
                            className={
                              styles.pageContainer_searchContainer_sortingBar_sortPrice_under_text
                            }
                          >
                            價格：低至高
                          </span>
                          {paramters.orderByKeyword === "price" &&
                          paramters.orderBy === "asc" ? (
                            <span
                              className={
                                styles.pageContainer_searchContainer_sortingBar_sortPrice_under_tick
                              }
                            ></span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className={
                            styles.pageContainer_searchContainer_sortingBar_sortPrice_under_subtitle
                          }
                          onClick={() => setSortingMethon("price", "desc")}
                        >
                          <span
                            className={
                              styles.pageContainer_searchContainer_sortingBar_sortPrice_under_text
                            }
                          >
                            價格：高至低
                          </span>
                          {paramters.orderByKeyword === "price" &&
                          paramters.orderBy === "desc" ? (
                            <span
                              className={
                                styles.pageContainer_searchContainer_sortingBar_sortPrice_under_tick
                              }
                            ></span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      styles.pageContainer_searchContainer_searchResultContainer
                    }
                  >
                    {goodsList.map((data, index) => {
                      return <GoodsCard key={data.id} goodsData={data} />;
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.pageContainer_searchContainer_mainBlock}>
                <div
                  className={styles.pageContainer_searchContainer_main_notFound}
                >
                  <div
                    className={
                      styles.pageContainer_searchContainer_main_notFound_block
                    }
                  >
                    <div
                      className={
                        styles.pageContainer_searchContainer_main_notFound_block_image
                      }
                    >
                      <img
                        src={NotFoundLogo}
                        className={
                          styles.pageContainer_searchContainer_main_notFound_block_image_img
                        }
                      />
                    </div>
                    <div
                      className={
                        styles.pageContainer_searchContainer_main_notFound_title
                      }
                    >
                      未找到商品
                    </div>
                    <div
                      className={
                        styles.pageContainer_searchContainer_main_notFound_text
                      }
                    >
                      嘗試不同或更常見的關鍵字
                    </div>
                  </div>
                </div>
                <div className={styles.pageContainer_hotItemContainer}>
                  <div className={styles.pageContainer_hotItemContainer_block}>
                    <div
                      className={
                        styles.pageContainer_hotItemContainer_block_header
                      }
                    >
                      <span
                        className={
                          styles.pageContainer_hotItemContainer_block_header_text
                        }
                      >
                        猜你喜歡
                      </span>
                    </div>
                    <div
                      className={
                        styles.pageContainer_hotItemContainer_block_item
                      }
                    >
                      {hotGoodsList.map((data, index) => {
                        return <GoodsCard key={data.id} goodsData={data} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      {isLoading && <Loading />}
      {isErrorAlert && (
        <Alert
          type={"error"}
          content={"網路錯誤"}
          setIsDisplayState={() => {
            setTimeout(() => {
              console.log("delay");
              setIsErrorAlert(false);
            }, 2000);
          }}
        />
      )}
    </div>
  );
};

export default Search;
