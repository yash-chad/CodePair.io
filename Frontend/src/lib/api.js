import axios from "axios";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const instance = axios.create({
  baseURL: `http://localhost:5000`,
});

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.authorization = localStorage.getItem("token");
    } else if (sessionStorage.getItem("token")) {
      config.headers.authorization = sessionStorage.getItem("token");
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (
      err &&
      err.response &&
      err.response.status === 401 &&
      err.config &&
      !err.config.__isRetryRequest
    ) {
      localStorage.clear();
      sessionStorage.clear();
      history.push("/login");
    } else if (err && err.response && err.response.status === 500) {
      console.log(err.response.data);
    }
    return Promise.reject(err);
  }
);

export default instance;
