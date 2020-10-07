import { combineReducers } from "redux";
import AppReducer from "../containers/App/reducer";
import DashboardReducer from "../containers/Dashboard/reducer";
import LoginReducer from "../containers/Login/reducer";
import SearchReducer from "../containers/Search/reducer"

export default combineReducers({
  AppReducer,
  DashboardReducer,
  LoginReducer,
  SearchReducer,
});
