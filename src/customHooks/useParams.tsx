import React from 'react';
import {useLocation,} from "react-router-dom";

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

const useParams = ({keys})=>{
    const location: location = useLocation();
    const { pathname } = useLocation();
    const {search} = location;


    return getParams(search, keys);
}

export default useParams;