import { atom, selector } from 'recoil';
import axios from 'axios';
import { API_URL } from '../API/API';

export interface userQuoteType {
    userId: string;
    content:string;
}

export interface QuoteType {
    content:string;
    writer:string;
}

export interface myQuote {
    content:string
}

export const myQuoteState = atom<myQuote>({
    key: 'myQuoteState',
    default: {content:''},
    // 여기에 get 값 있을 때 값을...설정해줄 수 있나??
});

export const quotesList = selector<QuoteType[]>({
    key:'quotes',
    get: async () => {
        try {
            const response = await axios.get('http://localhost:5175/quotes');
            return response.data;
        } catch (error){
            console.log(`Error: \n${error}`);
            return [];
        }
    }
})

//어떻게 처리해야 작성한게 바로 갱신될지 모르겠음...

export const getQuotes =  selector<myQuote> ({
    key:'userQuotes',
    get: async ({get}) => {
        try {
            const response = await axios.get('http://localhost:5175/userQuotes');
            return response.data;
        } catch (error){
            console.log(`Error: \n${error}`);
        }
    }
})