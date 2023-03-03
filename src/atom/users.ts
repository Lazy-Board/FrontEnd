import { atom } from 'recoil';
import { api } from './signin';

export interface userType{
    phoneNumber:string;
    profile:string;
    socialType:string;
    userEmail:string;
    userName:string;
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