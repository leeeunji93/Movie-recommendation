import { createAction, handleActions } from "redux-actions";
/*import { useState } from "react";*/

const SET_DIARY = "diaryList/SET_DIARY";

const initialState = {
  list: {
    diaryArr: [],
    page: 0,
    totalPage: 0,
    totalCount: 0,
  },
};

export const setDiary = createAction(SET_DIARY);

export default handleActions(
  {
    [SET_DIARY]: (state, action) => {
      console.log("@@@@ state: ", state);
      console.log("@@@@ action: ", action);
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.key]: action.payload.value,
        },
      };
    },
  },
  initialState
);
