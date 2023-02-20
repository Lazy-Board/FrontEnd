import { useState } from "react";
import styled from "styled-components";

const Edit = styled.textarea`
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
    const [text, setText] = useState('');

    const changeText = (event:any) => {
        const {target: {value}}=event;
        setText(value);
    }

    return (
        <>
            <input type='checkbox' id='edit-modal' className="modal-toggle"/>
            <div className="modal">
                <form className="modal-box w-96">
                    <Edit className="w-full py-4" value={text} onChange={changeText} placeholder={text==='' ? '100자 이내로 당신의 명언을 적어주세요!' : ''} maxLength={100}/>
                    <div className="modal-action justify-center">
                        <label htmlFor="edit-modal" className="btn btn-primary" >
                            저장
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