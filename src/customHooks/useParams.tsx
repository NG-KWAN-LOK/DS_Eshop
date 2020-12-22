import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { getParams } from "../utils/tools";

interface location {
  pathname: string;
  search: string;
  state:
    | {
        from: string;
      }
    | undefined;
}

const useParams = ({ keys }) => {
  const location: location = useLocation();
  const { pathname } = useLocation();
  const { search } = location;
  const paramters = useMemo(() => getParams(search, keys), [search]);

  return paramters;
};

export default useParams;
