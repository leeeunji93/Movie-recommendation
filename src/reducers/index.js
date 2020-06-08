import auth from "./auth";
import search from "./search";
import diaryList from "./diaryList";
import { combineReducers } from "redux";

const reducers = combineReducers({
  auth,
  search,
  diaryList,
});

export default reducers;
