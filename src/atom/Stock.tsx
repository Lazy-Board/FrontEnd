import axios from "axios";
import { atom, selector, useRecoilValue } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./signin";

export const getStockMain = selector({
  key: "getStockMain",
  get: async ({ get }) => {
    const response = await api.get(`stock/search`);
    return response.data;
  },
});

export const getStockDetail = selector({
  key: "getStockDetail",
  get: async ({ get }) => {
    const response = await api.get(`/stock/detail`);
    return response.data;
  },
});

export const StockLike = atom<String[]>({
  key: "StockLike",
  default: [],
});
