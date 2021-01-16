import { SET_CONTENT_MODAL, SET_CONTENT_TEXT, SET_PREVIEW } from "../types";
const initialState = {
  modalOpen: false,
  text: "",
  preview: [],
};

export const content = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case SET_CONTENT_MODAL:
      return {
        ...state,
        modalOpen: action.payload,
      };
    case SET_PREVIEW: {
      return {
        ...state,
        preview: [action.payload, ...state.preview],
      };
    }

    default:
      return state;
  }
};
