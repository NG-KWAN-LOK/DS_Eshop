import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { getParams } from "./tools";

const findTitle = (keys) => {
  console.log("findTitle");
  var title = "";
  keys.forEach((key) => {
    console.log(key);
    title += key + "｜";
  });
  return title;
};

export default findTitle;
