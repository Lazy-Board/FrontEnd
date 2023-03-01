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
export type StockProps = {
  stockName: string;
  price: number;
  dayRange: any;
  diffAmount: string;
  lowPrice: number;
  highPrice: number;
  tradingVolume: number;
  updateAt: string;
  engName: string;
};

const getStockMain = async () => {
  const res = await api.get("/stock/search");
  return res.data;
};
const getWish = async () => {
  const res = await api.get("/stock/search");
  return res.data.map((item: StockProps) => item.stockName);
};

export const getStockDetail = selector<StockProps[]>({
  key: "getStockDetail",
  get: async ({ get }) => {
    const response = await api.get(`/stock/detail`);
    return response.data;
  },
});

export const StockLike = atom<StockProps[]>({
  key: "StockLike",
  default: getStockMain(),
});

export const StockWish = atom<String[]>({
  key: "StockWish",
  default: getWish(),
});
