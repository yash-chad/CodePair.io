import store from "../store/index";
import { SET_AUTHENTICATED } from "../store/types";

const Storage = () => {
  const config = () => {
    const token = localStorage.token;
    if (token) {
      store.dispatch({ type: SET_AUTHENTICATED, payload: true });
    }
  };
  return {
    config,
  };
};
export default Storage;
