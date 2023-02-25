import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RecoilState, useRecoilState } from "recoil";

import { accessTokenState, refreshTokenState } from "../../atom/auth";
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

export const api = axios.create({
  baseURL: "http://3.35.129.231:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
export const Refresh = () => {
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

          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);

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
  return null;
};
