import axios from "axios";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import { API_URL } from "../API/API";
import { accessTokenState, authTokenState } from "./auth";
// const accessToken = useRecoilValue(accessTokenState);
const accessToken = localStorage.getItem("accessToken");
export const api = axios.create({
  baseURL: "http://3.35.129.231:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
