import { atom } from "recoil";

export const timeState = atom({
  key: "timeState",
  default: "",
});

import axios, { AxiosRequestConfig } from "axios";
import moment from "moment";
import { API_URL } from "../API/API";

export const refresh = async (config: any) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const expireAt = localStorage.getItem("expiresAt");
  let token = localStorage.getItem("accessToken");

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
    const body = {
      refreshToken,
    };

    // 토큰 갱신 서버통신
    const { data } = await axios.post(`${API_URL}/user/reissue`, body);

    token = data.data.accessToken;
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem(
      "expiresAt",
      moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss")
    );
  }

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

export const refreshErrorHandle = (err: any) => {
  localStorage.removeItem("refreshToken");
};
