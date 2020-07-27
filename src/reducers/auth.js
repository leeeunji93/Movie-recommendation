import { createAction, handleActions } from 'redux-actions';

const DESTROY = 'auth/DESTROY';
const SET_LOGIN = 'app/SET_LOGIN';

const initialState = {
  isLogin: false,
};

export const destroy = createAction(DESTROY);
export const setLogin = createAction(SET_LOGIN);

export default handleActions(
  {
    [SET_LOGIN]: (state, action) => {
      return {
        ...state,
        //action.payoad하면 왜 안먹지
        isLogin: action.payload,
        // [action.payload.key]: action.payload.value,
      };
    },
    [DESTROY]: (state, action) => initialState,
  },
  initialState,
);
