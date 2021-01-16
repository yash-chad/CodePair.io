const initialState = {
  notes_list: [],
};

export const notes = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTES":
      return {
        ...state,
        notes_list: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        // notes_list: action.payload,
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        // notes_list: action.payload,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        // notes_list: action.payload,
      };
    default:
      return state;
  }
};
