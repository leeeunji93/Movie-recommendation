import auth from "./auth";
import search from "./search";
import { combineReducers } from "redux";

const reducers = combineReducers({
  auth,
  search,
});

export default reducers;
