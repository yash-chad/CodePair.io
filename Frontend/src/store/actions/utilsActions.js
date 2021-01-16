import { CLOSE_TOAST, OPEN_TOAST } from "../types";

export function showToast(message, type) {
  const payload = {
    message,
    type,
  };
  return (dispatch) =>
    dispatch({
      type: OPEN_TOAST,
      payload,
    });
}

export function closeToast() {
  return (dispatch) =>
    dispatch({
      type: CLOSE_TOAST,
    });
}
