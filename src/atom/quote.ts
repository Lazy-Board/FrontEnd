import { atom, selector } from "recoil";
import axios from "axios";
import { API_URL } from "../API/API";
import { api } from "./signin";

export interface userQuoteType {
  userId: string;
  content: string;
}

export interface QuoteType {
  content: string;
  writer: string;
}

export const myQuoteState = atom({
  key: "myQuoteState",
  default: { content: "" },
});

export const quotesList = selector<QuoteType>({
  key: "quotes",
  get: async () => {
    try {
      const response = await api.get(`/quotes`);
      return response.data;
    } catch (error) {
      console.log(`Error: \n${error}`);
      return {};
    }
  },
});

export const getQuotes = async () => {
  try {
    const response = await api.get(`/userQuotes`);
    return response.data;
  } catch (error) {
    console.log(`Error: \n${error}`);
    return {};
  }
};
