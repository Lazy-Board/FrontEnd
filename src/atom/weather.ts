import { api } from "./signin";
import { atom } from "recoil";

export interface MyWeatherLocation{
    cityName:string;
    locationName:string;
}

export interface WeatherType{
    locationId:number;
    cityName:string;
    locationName:string;
    icon:string;
    weatherId:string
    temperature:string;
    effectiveTemperature:string;
    highestTemperature:string;
    lowestTemperature:string;
    pressure:string;
    humidity:string;
    windSpeed:string;
    windDirection:string;
    updatedAt:string;
}

export const weatherLocationState = atom<MyWeatherLocation>({
    key: 'myWeatherLocationState',
    default: {cityName:'', locationName:''},
});

export const getWeather = async() => {
    try{
        const response = await api.get(`/weather`)
        return response.data;
    } catch(error){
        console.log(`Error: ${error}`)
    }
}

export const getInfo = async() => {
    try{
        const response = await api.get(`/weather/user-info`)
        return response.data;
    } catch(error){
        console.log(`Error: ${error}`)
    }
}