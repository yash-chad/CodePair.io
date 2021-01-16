import { createStore, applyMiddleware } from "redux";
import combinedReducer from "./reducers/index";
import thunk from "redux-thunk";

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const preloaded_state = {};
export default createStore(
  combinedReducer,
  preloaded_state,
  applyMiddleware(thunk, logger)
);
