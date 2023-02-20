import axios from "axios";
import { selector } from "recoil";

export const getNewsSelector = selector({
  key: "getNewsSelector",
  get: async ({ get }) => {
    const response = await axios.get("http://localhost:3000/news");
    return response.data;
  },
});
