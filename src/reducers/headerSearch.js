import { createAction, handleActions } from 'redux-actions';

const SET_HEADERSEARCH = 'header/SET_HEADERSEARCH';
const DESTROY = 'header/DESTROY';

const initialState = {
  search: {
    searchArr: [],
  },
};

export const setHeaderSearch = createAction(SET_HEADERSEARCH);
export const destroy = createAction(DESTROY);

export default handleActions(
  {
    [SET_HEADERSEARCH]: (state, action) => {
      console.log('@@키워드', state);
      return {
        ...state,
        search: {
          ...state.search,
          [action.payload.key]: action.payload.value,
        },
      };
    },
    [DESTROY]: (state, action) => initialState,
  },
  initialState,
);
