import API from "../../lib/api";
import { SET_AUTHENTICATED, SET_CURRENT_USER, OPEN_TOAST } from "../types";
import history from "../../history";

export const signup = (data, history) => {
  const result = API.post("/api/users/register", data);

  console.log(data);
  return (dispatch) =>
    result
      .then((response) => {
        if (response.status === 201) {
          history.push("/login");
          window.location.reload();

          const payload = {
            message: "Account Created Successfully",
            type: "success",
          };
          dispatch({
            type: OPEN_TOAST,
            payload,
          });
        } else {
          const payload = {
            message: "Signup Failed",
            type: "error",
          };
          dispatch({
            type: OPEN_TOAST,
            payload,
          });
        }
      })
      .catch((Exception) => {
        console.log(Exception);
        const payload = {
          message: "Signup Failed",
          type: "error",
        };
        dispatch({
          type: OPEN_TOAST,
          payload,
        });
      });
};

export const login = (data) => {
  const result = API.post("/api/users/login", data);

  return (dispatch) =>
    result
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          dispatch({
            type: SET_CURRENT_USER,
            payload: response.data.user,
          });
          dispatch({
            type: SET_AUTHENTICATED,
            payload: true,
          });
          history.push("/dashboard");
          window.location.reload();
          const payload = {
            message: "Login Successful!",
            type: "success",
          };
          dispatch({
            type: OPEN_TOAST,
            payload,
          });
        } else {
          const payload = {
            message: "Failed To Login",
            type: "error",
          };
          dispatch({
            type: OPEN_TOAST,
            payload,
          });
        }
        // Else popup needs to be shown using Toaster
      })
      .catch((Exception) => {
        const payload = {
          message: "Failed To Login",
          type: "error",
        };
        dispatch({
          type: OPEN_TOAST,
          payload,
        });
      });
};

export const verifyToken = (token, history) => {
  const result = API.post("/api/users/verifyToken", { token });

  return (dispatch) =>
    result
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          dispatch({
            type: SET_CURRENT_USER,
            payload: response.data.user,
          });
          dispatch({
            type: SET_AUTHENTICATED,
            payload: true,
          });
          history.push(history.goBack);
        }
        // Else popup needs to be shown using Toaster
      })
      .catch((Exception) => {});
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  const result = API.post("/api/users/getCurrentUser", { token });

  return (dispatch) =>
    result
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          dispatch({
            type: SET_CURRENT_USER,
            payload: response.data.user,
          });
        }
      })
      .catch((Exception) => {
        console.log(Exception);
      });
};
