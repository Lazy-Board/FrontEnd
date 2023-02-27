import { atom, selector } from 'recoil';
import axios from 'axios';
import { API_URL } from '../API/API';

export interface MyLocation{
    startingPoint:string;
    destination:string;
}

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

//상세
export const getUserLocation =  selector<MyLocation> ({
    key:'myLocation',
    get: async ({get}) => {
        try {
            const response = await axios.get(`${API_URL}/traffic`);
            return response.data;
        } catch (error){
            console.log(`Error: \n${error}`);
        }
    }
})

//메인화면
export const getLocation =  selector<Duration> ({
    key:'location',
    get: async ({get}) => {
        try {
            // 추후 /traffic/duration으로 변경
            const response = await axios.get(`${API_URL}/duration`);
            return response.data;
        } catch (error){
            console.log(`Error: \n${error}`);
        }
    }
})
