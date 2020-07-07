import { createAction, handleActions } from 'redux-actions';

const SET_USERDIARY = 'userDiary/SET_USERDIARY';

const initialState = {
  userDiary: {
    userDiaryArr: [],
    userDiaryPage: 0,
    userDiaryTotalPage: 0,
    userDiaryTotalCount: 0,
  },
};

export const setUserDiary = createAction(SET_USERDIARY);

export default handleActions(
  {
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
