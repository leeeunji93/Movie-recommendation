import { createAction, handleActions } from 'redux-actions';
/*import { useState } from "react";*/

const SET_FORM = 'search/SET_FORM';
const DESTROY = 'search/DESTROY';
const SET_NEVER = 'search/SET_NEVER';
const SET_DATE = 'search/SET_DATE';

const initialState = {
  selectedMovie: null, //이거 지워도 되나?
  // dId: 0,
  isModify: 0,
  // watchDate: new Date('2020-06-23T21:11:54'),
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
export const setDate = createAction(SET_DATE);
export const destroy = createAction(DESTROY);
export const setNever = createAction(SET_NEVER);

export default handleActions(
  {
    // [SET_DATE]: (state, action) => {
    //   console.log('@@@@datestate:', state);
    //   return {
    //     ...state,
    //     watchDate: action.payload,
    //   };
    // },
    [SET_FORM]: (state, action) => {
      console.log('@@@@ state: ', state);
      console.log('@@@@ action: ', action);
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
