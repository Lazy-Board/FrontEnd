import axios from "axios";
import { atom, selector } from "recoil";
import { API_URL } from "../API/API";
import { api } from "./signin";

export interface MyWeatherLocation {
  cityName: string;
  locationName: string;
}

export interface MyWeatherLocationID {
  userId: string;
  cityName: string;
  locationName: string;
}

export interface WeatherType {
  userId: string;
  cityName: string;
  locationName: string;
  temperature: string;
  effectiveTemperature: string;
  highestTemperature: string;
  lowestTemperature: string;
  weatherInformation: string;
  weatherComparison: string;
  humidity: string;
  ultraviolet: string;
  fineParticle: string;
  ultrafineParticle: string;
  windSpeed: string;
  windDirection: string;
  updatedAt: string;
}

export const weatherLocationState = atom<MyWeatherLocation>({
  key: "myWeatherLocationState",
  default: { cityName: "", locationName: "" },
});

export const getUserWeather = selector<MyWeatherLocationID>({
  key: "getUserWeather",
  get: async ({ get }) => {
    const response = await api.get(`/weather/user-info`);
    return response.data;
  },
});

export const getWeather = selector<WeatherType>({
  key: "getWeather",
  get: async ({ get }) => {
    const response = await api.get(`${API_URL}/weather`);
    return response.data;
  },
});
