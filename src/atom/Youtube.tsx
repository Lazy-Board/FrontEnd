import axios from "axios";
import { selector } from "recoil";
import { API_URL } from "../API/API";
<<<<<<< HEAD

export const getYoutube = selector({
  key: "getYoutube",
  get: async ({ get }) => {
    const response = await axios.get(`${API_URL}/youtube`);
    return response.data;
  },
});
=======
import { api } from "./signin";

export const getYoutube = selector<YoutubeProps[]>({
  key: "getYoutube",
  get: async ({ get }) => {
    const response = await api.get(`/youtube`);
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
>>>>>>> ede9d980749506e433fa4e99e757901c588ed040
