import { createAction, handleActions } from 'redux-actions';
/*import { useState } from "react";*/

const SET_FORM = 'search/SET_FORM';
const DESTROY = 'search/DESTROY';
const SET_NEVER = 'search/SET_NEVER';
// const SET_INSERT = 'search/INSERT';

const initialState = {
  form: {
    tagsAll: [],
    title: '',
    cover: '',
    notes: '',
    rating: '',
    tags: '',
    watchDate: '',
    createdAt: '0',
    modifiedAt: '0',
  },
  never: {
    keyword: '',
    selectedMovie: null,
    searchResultArr: [],
  },
};

export const setForm = createAction(SET_FORM);
export const destroy = createAction(DESTROY);
export const setNever = createAction(SET_NEVER);

export default handleActions(
  {
    [SET_FORM]: (state, action) => {
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.key]: action.payload.value,
        },
      };
    },

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
