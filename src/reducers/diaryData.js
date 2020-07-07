import { createAction, handleActions } from 'redux-actions';

const SET_DETAIL = 'diaryData/SET_DETAIL';
const SET_USERDIARY = 'userDiary/SET_USERDIARY';

const initialState = {
  data: {
    movie: null,
    diary: null,
    user: null,
  },
  userDiary: {
    userDiaryArr: [],
    userDiaryPage: 0,
    userDiaryTotalPage: 0,
    userDiaryTotalCount: 0,
  },
};

export const setDetail = createAction(SET_DETAIL);
export const setUserDiary = createAction(SET_USERDIARY);

export default handleActions(
  {
    [SET_DETAIL]: (state, action) => {
  
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: action.payload.value,
        },
      };
    },
    [SET_USERDIARY]: (state, action) => {
  
      return {
        ...state,
        userDiary: {
          ...state.userDiary,
          [action.payload.key]: action.payload.value,
        },
      };
    },
  },
  initialState,
);
