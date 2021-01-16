import { SET_AUTHENTICATED, SET_CURRENT_USER } from "../types";
const initialState = {
  isAuthenticated: false,
  current_user: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.payload,
      };
    default:
      return state;
  }
};
