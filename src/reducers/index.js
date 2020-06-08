import auth from "./auth";
import search from "./search";
import diaryList from "./diaryList";
import diaryData from "./diaryData";
import { combineReducers } from "redux";

const reducers = combineReducers({
  auth,
  search,
  diaryList,
  diaryData,
});

export default reducers;
