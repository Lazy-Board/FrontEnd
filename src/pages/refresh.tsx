import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("RefreshToken");

const api = axios.create({
  baseURL: "http://3.35.129.231:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post<AuthResponse>("/user/reissue", {
          headers: {
            RefreshToken: `Bearer ${refreshToken}`,
          },
        });

        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("RefreshToken", refreshToken);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (e) {
        console.error(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
