import axios from "axios";
import { atom, selector, useRecoilValue } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./signin";

// export const getStockMain = selector({
//   key: "getStockMain",
//   get: async ({ get }) => {
//     const response = await api.get(`stock/search`);
//     return response.data;
//   },
// });
export type DetailStockProps = {
  stockName: string;
  price: number;
  dayRange: any;
  diffAmount: string;
  lowPrice: number;
  highPrice: number;
  tradingVolume: number;
  updateAt: string;
};
export type MainStockProps = {
  stockName: string;
  price: number;
  dayRange: any;
  diffAmount: string;
  updateAt: string;
};

const getStockMain = async () => {
  const res = await api.get("/stock/search");
  return res.data;
};

export const getStockDetail = selector<DetailStockProps[]>({
  key: "getStockDetail",
  get: async ({ get }) => {
    const response = await api.get(`/stock/detail`);
    return response.data;
  },
});

export const StockLike = atom<MainStockProps[]>({
  key: "StockLike",
  default: getStockMain(),
});

export const StockWish = atom<String[]>({
  key: "StockWish",
  default: [],
});
