import axios from "axios";
import { atom, selector, useRecoilValue } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./auth";

export const getStockMain = selector({
  key: "getStockMain",
  get: async ({ get }) => {
    const response = await api.get(`/read`);
    return response.data;
  },
});

export const getStockDetail = selector({
  key: "getStockDetail",
  get: async ({ get }) => {
    const response = await api.get(`/detail`);
    return response.data;
  },
});

export const StockLike = atom<String[]>({
  key: "StockLike",
  default: [],
});
