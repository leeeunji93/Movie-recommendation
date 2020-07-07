import { createAction, handleActions } from 'redux-actions';

const SET_FORM = 'auth/SET_FORM';
const DESTROY = 'auth/DESTROY';
const SET_LOGIN = 'app/SET_LOGIN';

const initialState = {
  isLogin: false,
  form: {
    email: '',
    pwd: '',
    nickname: '',
    pwdConfirm: '',
  },
};

export const setForm = createAction(SET_FORM);
export const destroy = createAction(DESTROY);
export const setLogin = createAction(SET_LOGIN);

export default handleActions(
  {
    [SET_FORM]: (state, action) => {
      // console.log('@@@@ state: ', state);
      // console.log('@@@@ action: ', action);
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.key]: action.payload.value,
        },
      };
    },
    [SET_LOGIN]: (state, action) => {
 
      return {
        ...state,
        //action.payoad하면 왜 안먹지
        isLogin: action.payload,
      };
    },
    [DESTROY]: (state, action) => initialState,
  },
  initialState,
);
