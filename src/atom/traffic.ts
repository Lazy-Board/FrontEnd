import { atom, selector } from 'recoil';
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

export const startingState = atom<string>({
    key:'startingState',
    default:'',
})

export const destinationState = atom<string>({
    key:'destinationState',
    default:'',
})

//메인화면
export const getLocation =  selector<Duration> ({
    key:'location',
    get: async ({get}) => {
        try {
            const response = await api.get(`/traffic/duration`);
            return response.data;
        } catch (error){
            console.log(`Error: \n${error}`);
        }
    }
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
        const response = await api.get(`traffic/duration`);
        return response.data;
    } catch (error){
        console.log(`Error: \n${error}`);
    }
}