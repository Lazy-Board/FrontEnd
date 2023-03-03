import { atom, selector } from "recoil";
import { api } from "./signin";

export interface ExchangeProps {
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
  try {
    const response = await api.get(`/exchange/search`);
    return response.data;
  } catch (error){
    console.log(`Error: ${error}`)
  }
}

export const getExchangeDetails = async () => {
  try{
    const response = await api.get("/exchange/detail");
    return response.data;
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

export const getExchangeDetail = selector<ExchangeProps[]>({
  key: "getExchangeDetail",
  get: async ({ get }) => {
    try {
      const response = await api.get(`/exchange/detail`);
      return response.data;
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  },
});

export const getExchangeWish = async () => {
  try{
    const response = await api.get("/exchange/search");
    return response.data.map((item: ExchangeProps) => item.currencyName);
  } catch (error) {
    console.log(`Error: ${error}`)
  }
};

export const exchangeLike = atom<ExchangeProps[]>({
  key: "exchangeLike",
  default: getExchangeMain() || [],
});

export const exchangeWish = atom<String[]>({
  key: "exchangeWish",
  default: getExchangeWish() || [],
});