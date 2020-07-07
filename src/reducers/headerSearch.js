import { createAction, handleActions } from 'redux-actions';

const SET_HEADERSEARCH = 'header/SET_HEADERSEARCH';
// const SET_KEYWORD = 'header/SET_KEYWORD';

const initialState = {
  search: {
    keyword: '',
    searchArr: [],
  },
};

export const setHeaderSearch = createAction(SET_HEADERSEARCH);
// export const setKeyword = createAction(SET_KEYWORD);

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
    // [SET_KEYWORD]: (state, action) => {
    //   console.log('@@헤더검색', state);
    //   return {
    //     ...state,
    //     searchArr: action.payload,
    //   };
    // },
  },
  initialState,
);
