import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { atom, useRecoilState } from "recoil";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: localStorage.getItem("accessToken"),
});

const refreshTokenState = atom<string | null>({
  key: "refreshTokenState",
  default: localStorage.getItem("RefreshToken"),
});

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const Refresh = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await axios.post<AuthResponse>("/refresh-token", {
            refreshToken,
          });

          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);

          localStorage.setItem("access_token", data.accessToken);
          localStorage.setItem("refresh_token", data.refreshToken);

          return axiosInstance(originalRequest);
        } catch (e) {
          console.error(e);
        }
      }

      return Promise.reject(error);
    }
  );

  return { accessToken, refreshToken };
};

export { Refresh, axiosInstance };
