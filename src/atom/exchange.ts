import { atom, selector } from "recoil";
import { api } from "./signin";

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
  updateAt:string;
  round:string;
  classes: string;
  isOpened: boolean;
  handleOpening: Function;
}

export const getExchangeMain = async()=>{
  const response = await api.get(`/exchange/search`);
  return response.data;
}

export const getExchangeDetail = selector<AccordionProps[]>({
  key: "getExchangeDetail",
  get: async ({ get }) => {
    const response = await api.get(`/exchange/detail`);
    return response.data;
  },
});

export const getExchangeWish = async () => {
  const res = await api.get("/exchange/search");
  return res.data.map((item: AccordionProps) => item.currencyName);
};

export const exchangeLike = atom<AccordionProps[]>({
  key: "exchangeLike",
  default: getExchangeMain(),
});

export const exchangeWish = atom<String[]>({
  key: "exchangeWish",
  default: getExchangeWish(),
});