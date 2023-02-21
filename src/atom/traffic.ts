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

export const locationState = atom<MyLocation>({
    key: 'myLocationState',
    default: {startingPoint:'',destination:''},
});

export const getUserLocation =  selector<MyLocation> ({
    key:'myLocation',
    get: async ({get}) => {
        try {
            const response = await axios.get('http://localhost:5175/traffic');
            return response.data;
        } catch (error){
            console.log(`Error: \n${error}`);
        }
    }
})

export const getLocation =  selector<Location> ({
    key:'location',
    get: async ({get}) => {
        try {
            const response = await axios.get('http://localhost:5175/traffic');
            return response.data;
        } catch (error){
            console.log(`Error: \n${error}`);
        }
    }
})
