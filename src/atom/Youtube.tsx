import axios from "axios";
import { selector } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./auth";

export const getYoutube = selector({
  key: "getYoutube",
  get: async ({ get }) => {
    const response = await api.get(`${API_URL}/youtube`);
    return response.data;
  },
});
