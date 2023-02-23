import axios from "axios";

// url 호출 시 기본 값 셋팅
const api = axios.create({
  baseURL: "http://3.35.129.231.8080",
  headers: { "Content-type": "application/json" }, // data type
});

// Add a request interceptor
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");

    //요청시 AccessToken 계속 보내주기
    if (!token) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
      return config;
    }

    if (config.headers && token) {
      const { accessToken, refreshToken } = JSON.parse(token);
      config.headers.authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
      return config;
    }
    // Do something before request is sent
    console.log("request start", config);
  },
  function (error) {
    // Do something with request error
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("get response", response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (error.response.status === 401) {
      const originalRequest = config;
      const refreshToken = await localStorage.getItem("RefreshToken");
      // token refresh 요청
      const { data } = await api.get(
        "user/reissue", // token refresh api
        { headers: { RefreshToken: `Bearer ${refreshToken}` } }
      );
      // 새로운 토큰 저장
      // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        data;
      await localStorage.multiSet([
        ["accessToken", newAccessToken],
        ["RefreshToken", newRefreshToken],
      ]);
      originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
      // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
      return axios(originalRequest);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default api;
