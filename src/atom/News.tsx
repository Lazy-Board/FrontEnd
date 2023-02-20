import axios from "axios";
import { atom, selector } from "recoil";
import { API_URL } from "../API/API";

export const getNewsSelector = selector({
  key: "getNewsSelector",
  get: async ({ get }) => {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  },
});
export const selectNewsBrand = atom({
  key: "selectNewsBrand",
  default: null,
});

export const selectedNewsData = atom({
  key: "selectedNewsData",
  default: [],
});
