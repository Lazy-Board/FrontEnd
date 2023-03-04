import axios from "axios";

// const accessToken = useRecoilValue(accessTokenState);
const accessToken = localStorage.getItem("accessToken");
export const api = axios.create({
  baseURL: "http://3.35.129.231:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  timeout: 12000,
});

export const imgApi = axios.create({
  baseURL: "http://3.35.129.231:8080",
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  },
})