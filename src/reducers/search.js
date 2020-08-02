import { createAction, handleActions } from 'redux-actions';

const DESTROY = 'search/DESTROY';
const SET_NEVER = 'search/SET_NEVER';
// const SET_INSERT = 'search/INSERT';

const initialState = {
  never: {
    selectedMovie: null,
    searchResultArr: [],
    tagsAll: [],
  },
};

export const destroy = createAction(DESTROY);
export const setNever = createAction(SET_NEVER);

export default handleActions(
  {
    [SET_NEVER]: (state, action) => {
      return {
        ...state,
        never: {
          ...state.never,
          [action.payload.key]: action.payload.value,
        },
      };
    },
    [DESTROY]: (state, action) => initialState,
  },
  initialState,
);
