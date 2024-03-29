import { atom } from 'recoil';
import { api } from './signin';

export interface Duration {
    startingPoint:string;
    destination:string;
    duration:string;
}

export interface GetGeocode {
    userId: string;
    startingPoint: string;
    startingGeoCode: string;
    destination: string
    destinationGeoCode: string;
}

export const startingState = atom({
    key:'startingState',
    default:{address:''},
})

export const destinationState = atom({
    key:'destinationState',
    default:{address:''},
})

export const getLoc = async () => {
    try {
        const response = await api.get(`/traffic`)
        return response.data;
    } catch (error){
        console.log(`Error: \n${error}`);
    }
}

export const getDur = async () => {
    try {
        const response = await api.get(`/traffic/duration`);
        return response.data;
    } catch (error){
        console.log(`Error: \n${error}`);
    }
}