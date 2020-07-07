import auth from './auth';
import search from './search';
import diaryList from './diaryList';
import diaryData from './diaryData';
import userDiary from './userDiary';
import headerSearch from './headerSearch';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  auth,
  search,
  diaryList,
  diaryData,
  userDiary,
  headerSearch,
});

export default reducers;
