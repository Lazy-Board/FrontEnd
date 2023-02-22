import axios from "axios";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import { API_URL } from "../API/API";
import { accessTokenState, authTokenState } from "./auth";
const accessToken = useRecoilValue(accessTokenState);
export const instance = axios.create({
  baseURL: API_URL,
  timeout: 180000,
  withCredentials: false,

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
  },
});
