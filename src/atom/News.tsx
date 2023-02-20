import axios from "axios";
import { atom, selector } from "recoil";

export const getNewsSelector = selector({
  key: "getNewsSelector",
  get: async ({ get }) => {
    const response = await axios.get("http://localhost:3000/news");
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
