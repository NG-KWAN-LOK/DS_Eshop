import useParams from "Customhooks/useParams";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getParams } from "Utils/tools";

const useSearch = () => {
  const history = useHistory();
  const localtion = useLocation();
  const paramters = useParams({keys:[
    "keyword",
    "orderBy",
    "orderByKeyword",
    "category",
    "minPrice",
    "maxPrice",
  ]});

  const updateParameter = (data) => {
    const newObej = {...paramters,...data};
    Object.keys(newObej).forEach(key=>{
        if(!newObej[key]) delete newObej[key];
    })
    const newSearch = new URLSearchParams(newObej).toString();
    history.push({
      pathname: localtion.pathname,
      search: newSearch,
    });
  };

  return { paramters, updateParameter };
};

export default useSearch;
