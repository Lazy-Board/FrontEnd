import axios from "axios";
import { selector } from "recoil";

export const getYoutube = selector({
  key: "getYoutube",
  get: async ({ get }) => {
    const response = await axios.get("http://3.35.129.231:8080/youtube");
    return response.data;
  },
});
