import { myQuoteState, myQuote } from "../../atom/quote";
import { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import styled from "styled-components";

const Edit = styled.textarea`
    height: 120px;
    padding: 5px;
    resize: none;
    border-radius:5px;
    transition: all 0.3s;
    background-color:#f5f5f5;
    &:focus{
        outline:none;
        background-color:#eee;
    }
`

const EditModal = ():JSX.Element => {
    const [userQuote, setUserQuote] = useRecoilState(myQuoteState);
    const [myQuote, setMyQuote] = useState('');

    const changeText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        const {target: {value}}=event;
        setMyQuote(value);
    }

    const saveText = async () => {
        try {
            const response = await axios.post('http://localhost:5175/userQuotes', {content:myQuote})
            setUserQuote(response.data)
        } catch (error){
            console.log(error)
        }
    }

    const deleteText = async () => {
        try {
            axios.post('http://localhost:5175/userQuotes',
            {content:''})
            setMyQuote('');
            setUserQuote((prevMyQuote: myQuote) => ({
                ...prevMyQuote,
                content: '',
            }));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <input type='checkbox' id='edit-modal' className="modal-toggle"/>
            <div className="modal">
                <form className="modal-box w-96">
                    <Edit className="w-full py-4" value={myQuote} onChange={changeText} placeholder="70자 이내로 당신의 명언을 적어주세요!" maxLength={70}/>
                    <div className="modal-action justify-center">
                        <label htmlFor="edit-modal" className="btn btn-primary" onClick={saveText}>
                            저장
                        </label>
                        <label htmlFor="edit-modal" className="btn btn-secondary" onClick={deleteText}>
                            삭제
                        </label>
                        <label htmlFor="edit-modal" className="btn btn-outline">
                            취소
                        </label>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditModal;