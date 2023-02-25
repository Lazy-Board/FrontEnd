import axios from "axios";
import { atom, selector } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./auth";

export interface AccordionProps {
  currencyName: string;
  countryName: string;
  tradingStandardRate: string;
  comparedPreviousDay: string;
  fluctuationRate: string;
  buyCash: string;
  sellCash: string;
  sendMoney: string;
  receiveMoney: string;
  classes: string;
  isOpened: boolean;
  handleOpening: Function;
}

export const getExchangeMain = selector({
  key: "getExchangeMain",
  get: async ({ get }) => {
    const response = await api.get(`/exchange/search`);
    return response.data;
  },
});

export const ExchangeLike = atom<any>({
  key: "exchangeLike",
  default: [],
});

export const getExchangeDetail = selector({
  key: "getExchangeDetail",
  get: async ({ get }) => {
    const response = await api.get(`/exchange/detail`);
    return response.data;
  },
});
