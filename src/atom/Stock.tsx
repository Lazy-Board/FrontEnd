import axios from "axios";
import { atom, selector, useRecoilValue } from "recoil";
import { API_URL } from "../API/API";

export const getStockMain = selector({
  key: "getStockMain",
  get: async ({ get }) => {
    const response = await axios.get(`${API_URL}/read`);
    return response.data;
  },
});

export const getStockDetail = selector({
  key: "getStockDetail",
  get: async ({ get }) => {
    const response = await axios.get(`${API_URL}/detail`);
    return response.data;
  },
});

export const StockLike = atom({
  key: "SortLowerPrice",
  default: [""],
});
