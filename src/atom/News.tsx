import axios from "axios";
import { atom, selector } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./signin";
export type selectedNewsListType = {
  pressId: number;
  pressName: string;
  sector: string;
};

export type MainNewsList = {
  newsId: number;
  subject: string;
  contents: string;
  pressId: number;
  pressName: string;
  createdAt: string;
  url: string;
  imagePath: string;
};
export const getNewsSelector = selector<MainNewsList[]>({
  key: "getNewsSelector",
  get: async ({ get }) => {
    const response = await api.get(`/news`);
    return response.data;
  },
});

const brand = async () => {
  const response = await api.get("/news");
  return response.data.map((item: any) => item.pressName);
};

const getNewsBrandList = async () => {
  const response = await api.get("/news/press");
  return response.data.map((item: selectedNewsListType) => item.pressName);
};

export const NewsBrandList = atom<String[]>({
  key: "NewsBrandList",
  default: getNewsBrandList(),
});

export const selectedNewsList = selector({
  key: "selectedNewsListSelector",
  get: async ({ get }) => {
    const response = await api.get("/news/press");
    return response.data;
  },
});
export const selectNewsBrand = atom({
  key: "selectNewsBrand",
  default: "헤드라인 뉴스",
});

export const selectedNewsData = atom<selectedNewsListType[]>({
  key: "selectedNewsData",
  default: [],
});

export const selectNews = selector<selectedNewsListType[]>({
  key: "selectNews",
  get: async ({ get }) => {
    const res = await api.get("/newsuser");
    return res.data;
  },
});
