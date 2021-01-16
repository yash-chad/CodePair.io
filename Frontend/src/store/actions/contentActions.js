import API from "../../lib/api";
import { SET_CONTENT_MODAL, SET_CONTENT_TEXT, SET_PREVIEW } from "../types";

export function getContent() {
  const room_id = window.location.pathname.split("/").slice(-1)[0];
  const result = API.get(`/api/content/getContent/${room_id}`);

  return (dispatch) =>
    result
      .then((response) => {
        // console.log(response.data);
        dispatch({
          type: SET_CONTENT_TEXT,
          payload: response.data.text,
        });
      })
      .catch((Exception) => {
        console.log(Exception);
      });
}

export const saveContent = async (text) => {
  const room_id = window.location.pathname.split("/").slice(-1)[0];
  const result = API.post("/api/content/saveContent", { room_id, text });

  result
    .then((res) => {
      // console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

export function setContentModal(data) {
  return (dispatch) =>
    dispatch({
      type: SET_CONTENT_MODAL,
      payload: data,
    });
}

export function getCustomContent(room_id) {
  const result = API.get(`/api/content/getContent/${room_id}`);

  return (dispatch) =>
    result
      .then((response) => {
        // console.log(response.data);
        dispatch({
          type: SET_PREVIEW,
          payload: response.data.text,
        });
      })
      .catch((Exception) => {
        console.log(Exception);
      });
}
