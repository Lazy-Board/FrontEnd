import axios from "axios";
import { selector } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./signin";

export const getYoutube = selector({
  key: "getYoutube",
  get: async ({ get }) => {
    const response = await api.get(`${API_URL}/youtube`);
    return response.data;
  },
});

export type YoutubeProps = {
  channelName: string;
  contentName: string;
  createdAt: any;
  hit: string;
  imagePath: string;
  length: number;
  updatedAt: null;
  videoId: string;
  videoUrl: string;
};
