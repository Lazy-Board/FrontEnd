import { atom } from "recoil";

export const authTokenState = atom({
  key: "authToken",
  default: null,
});

export const accessTokenState = atom({
  key: "accessToken",
  default: "",
});

export const refreshTokenState = atom({
  key: "refreshToken",
  default: "",
});

import axios from "axios";

import { refresh, refreshErrorHandle } from "./refresh";
import { API_URL } from "../API/API";

const Api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  params: {},
});

Api.interceptors.request.use(refresh, refreshErrorHandle);

export default Api;
