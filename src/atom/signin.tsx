import axios from "axios";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import { authTokenState } from "./auth";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  const authToken = useRecoilValue(authTokenState);
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default instance;
