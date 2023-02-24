import { myQuoteState } from "../../atom/quote";
import { useRecoilState } from "recoil";
import { useMutation, useQueryClient } from "react-query";
import { API_URL } from "../../API/API";
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
    const queryClient = useQueryClient();

    const changeText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        const {target: {value}}=event;
        setUserQuote({content:value});
    }

    const saveQuoteMutation = useMutation((userQuote:string) =>
        axios.post(`${API_URL}/userQuotes`, { content: userQuote })
    );

    const deleteQuoteMutation = useMutation(() =>
        axios.post(`${API_URL}/userQuotes`)
    );

    const saveText = async () => {
        try {
            const response = await saveQuoteMutation.mutateAsync(userQuote.content);
            setUserQuote(response.data)
            queryClient.invalidateQueries('userQuotes');
        } catch (error){
            console.log(`Error: \n${error}`)
        }
    }

    const deleteText = async () => {
        try {
            await deleteQuoteMutation.mutateAsync();
            setUserQuote((prevMyQuote: any) => ({
                ...prevMyQuote,
                content: '',
            }));
            queryClient.invalidateQueries('userQuotes');
        } catch (error) {
            console.error(`Error: \n${error}`);
        }
    }

    return (
        <>
            <input type='checkbox' id='edit-modal' className="modal-toggle"/>
            <div className="modal">
                <form className="modal-box w-96">
                    <Edit className="w-full py-4" value={userQuote.content} onChange={changeText} placeholder="80자 이내로 당신의 명언을 적어주세요!" maxLength={80}/>
                    <div className="modal-action justify-center">
                        <label htmlFor="edit-modal" 
                        className={`btn btn-primary ${userQuote.content==='' ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300 hover:bg-gray-300':''}`}
                        onClick={saveText}>
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