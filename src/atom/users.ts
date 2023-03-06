import { atom } from 'recoil';
import { api } from './signin';

export interface userType{
    phoneNumber:string;
    profile:string;
    socialType:string;
    userEmail:string;
    userName:string;
}

export type ModuleData = {
    [key: string]: boolean;
    exchangeYn: boolean;
    newsYn: boolean;
    quoteYn: boolean;
    stockYn: boolean;
    todolistYn: boolean;
    weatherYn: boolean;
    workYn: boolean;
    youtubeYn: boolean;
}

export const userInfoState = atom({
    key:'userInfoState',
    default:{
        phoneNumber:'',
        profile:'',
        socialType:'',
        userEmail:'',
        userName:''
    },
})

export const moduleState = atom({
    key:'userModules',
    default:{
        exchangeYn: false,
        newsYn: false,
        quoteYn: false,
        stockYn: false,
        todolistYn: false,
        weatherYn: false,
        workYn: false,
        youtubeYn: false,
    }
})

export const withdrawUser = async () => {
    try {
        await api.post(`/user/userWithdrawal`)
    } catch (error){
        alert(`Error: \n${error}`);
    }
}

export const getUserInfo = async () => {
    try {
        const response = await api.get(`/user/search`);
        return response.data;
    } catch (error){
        console.log(`Error: \n${error}`);
    }
};

export const getModule = async() => {
    try {
        const response = await api.get(`/user/searchModule`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}