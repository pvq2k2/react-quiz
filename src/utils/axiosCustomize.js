import axios from "axios";
import nProgress from "nprogress";
import { store } from "../redux/store";
import axiosRetry from "axios-retry";
import { refreshTokenAction } from "../redux/action/userAction";
import { postRefreshToken } from "../services/apiService";
import { history } from "./history";
nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

let shouldRetry = true;

axiosRetry(instance, {
  retries: 3,
  retryCondition: async (error) => {
    if (
      error.request.status === 401 ||
      (error.response.data.EC === -1 &&
        error.response.data.EM === "Not authenticated the user")
    ) {
      if (shouldRetry) {
        let email = store?.getState()?.user?.account?.email;
        let refresh_token = store?.getState()?.user?.account?.refresh_token;
        try {
          const res = await postRefreshToken(email, refresh_token);
          if (res && res.EC === 0) {
            store?.dispatch(refreshTokenAction(res));
            return true; // Cho phép retry sau khi refresh token thành công
          } else {
            shouldRetry = false; // Dừng retry nếu refresh token thất bại
            history.navigate("/login");
            return false; // Ngăn việc retry
          }
        } catch (err) {
          shouldRetry = false; // Dừng retry nếu có lỗi trong quá trình refresh token
          history.navigate("/login");
          return false; // Ngăn việc retry
        }
      } else {
        return false; // Ngăn việc retry nếu shouldRetry là false
      }
    }
    return error.request.status === 401 && shouldRetry;
  },
  retryDelay: async (retryCount) => {
    return retryCount * 1000;
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    nProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    nProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    nProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
