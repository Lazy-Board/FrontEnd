import { atom } from 'recoil';
import axios from "axios";
import { API_URL } from '../API/API';

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
        await axios.post(`${API_URL}/user/userWithdrawal`, {})
    } catch (error){
        alert(`Error: \n${error}`);
    }
}

export const getUserInfo = async () => {
    try {
        // api  ${API_URL}/user/search 로 변경해야 함
        const response = await axios.get(`${API_URL}/search`);
        return response.data;
    } catch (error){
        console.log(`Error: \n${error}`);
        return {};
    }
};
