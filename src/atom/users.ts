import { atom } from 'recoil';
// import { API_URL } from '../API/API';
// import axios from 'axios';
import { api } from './signin';

export interface userType{
    phoneNumber:string;
    socialType:string;
    userEmail:string;
    userName:string;
}

export const userInfoState = atom({
    key:'userInfoState',
    default:{
        phoneNumber:'',
        socialType:'',
        userEmail:'',
        userName:''
    },
})

export const withdrawUser = async () => {
    try {
        await api.post(`/user/userWithdrawal`, {})
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
