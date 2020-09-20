import { SET_USERNAME, SET_HOST } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_USERNAME:
      console.log(action.payload);
      return {
        ...state,
        username: action.payload,
      };

    case SET_HOST:
      return {
        ...state,
        isHost: action.payload,
      };
    default:
      return state;
  }
};
