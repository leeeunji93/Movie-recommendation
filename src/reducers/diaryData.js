import { createAction, handleActions } from "redux-actions";

const SET_DETAIL = "diaryData/SET_DETAIL";

const initialState = {
  data: {
    movie: null,
    diary: null,
    user: null,
  },
};

export const setDetail = createAction(SET_DETAIL);

export default handleActions(
  {
    [SET_DETAIL]: (state, action) => {
      console.log("@@@@ state: ", state);
      console.log("@@@@ action: ", action);
      return {
        ...state,
        data: {
          ...state.list,
          [action.payload.key]: action.payload.value,
        },
      };
    },
  },
  initialState
);
