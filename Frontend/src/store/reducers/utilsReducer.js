import { OPEN_TOAST, CLOSE_TOAST } from "../types";
const initialState = {
  toastOpen: false,
  toastMessage: "",
  toastType: "success",
};

export const utils = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TOAST:
      return {
        ...state,
        toastOpen: true,
        toastMessage: action.payload.message,
        toastType: action.payload.type,
      };
    case CLOSE_TOAST:
      return {
        ...state,
        toastOpen: false,
      };
    default:
      return state;
  }
};
