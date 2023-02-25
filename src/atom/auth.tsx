import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { atom, useRecoilState, selector } from "recoil";

export const authTokenState = atom({
  key: "authToken",
  default: "",
});

export const accessTokenState = atom({
  key: "accessToken",
  default: "",
});

export const refreshTokenState = atom({
  key: "refreshToken",
  default: "",
});
