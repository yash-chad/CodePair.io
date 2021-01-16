import API from "../../lib/api";
import {
  GET_ROOM_PARTICIPANTS,
  CREATE_ROOM_DIALOG,
  SET_CURRENT_ROOM,
  GET_ROOM_NAME,
  GET_MY_ROOMS,
} from "../types";
import history from "../../history";

export const setDialog = (newState) => {
  return (dispatch) =>
    dispatch({
      type: CREATE_ROOM_DIALOG,
      payload: newState,
    });
};

export const getRoomParticipants = (room_id) => {
  const result = API.get(`/api/room/getParticipants/${room_id}`);

  return (dispatch) =>
    result
      .then((response) => {
        dispatch({
          type: GET_ROOM_PARTICIPANTS,
          payload: response.data,
        });
      })
      .catch((Exception) => {
        console.log(Exception);
      });
};

export const getRoomName = (room_id) => {
  const result = API.get(`/api/room/getRoomName/${room_id}`);

  return (dispatch) =>
    result
      .then((response) => {
        dispatch({
          type: GET_ROOM_NAME,
          payload: response.data.room_name,
        });
      })
      .catch((Exception) => {
        console.log(Exception);
      });
};

export const createRoom = (room_name) => {
  const result = API.post(`/api/room/createRoom`, { room_name });

  return (dispatch) =>
    result
      .then((response) => {
        // console.log(response);
        dispatch({
          type: SET_CURRENT_ROOM,
          payload: response.data.room_id,
        });
        history.push(`/rooms/${response.data.room_id}`);
        window.location.reload();
      })
      .catch((Exception) => {
        console.log(Exception);
      });
};

export const joinRoom = (room_id) => {
  const result = API.get(`/api/room/joinRoom/${room_id}`);

  return (dispatch) =>
    result
      .then((response) => {
        console.log(response);
        dispatch({
          type: SET_CURRENT_ROOM,
          payload: room_id,
        });
        if (response.status === 200) {
          history.push(`/rooms/${room_id}`);
          window.location.reload();

          // For getting the list of the users
          const updatedRoomParticipants = API.get(
            `/api/room/getParticipants/${room_id}`
          );
          return (dispatch) =>
            updatedRoomParticipants
              .then((response) => {
                dispatch({
                  type: GET_ROOM_PARTICIPANTS,
                  payload: response.data,
                });
              })
              .catch((Exception) => {
                console.log(Exception);
              });
        }
        // else popup needs to be added using toaster
      })
      .catch((Exception) => {
        console.log(Exception);
      });
};

export const getMyRooms = () => {
  const result = API.get("/api/room/getMyRooms");

  return (dispatch) =>
    result
      .then((response) => {
        dispatch({
          type: GET_MY_ROOMS,
          payload: response.data,
        });
      })
      .catch((Exception) => {
        console.log(Exception);
      });
};
