import DaumPostcodeEmbed from 'react-daum-postcode';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper=styled.div`
    position:relative;
    max-width:420px;
    .postModal {
        max-width:390px;
        min-height:540px;
        padding: 15px 8px;
        padding-top: 45px;
        position:fixed;
        left:50%;
        transform: translate(-50%, -105%);
        border-radius:10px;
        background-color:white;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        z-index:9000;
    }
`

const ButtonStyle=styled.button`
    position: absolute;
    top: -555px;
    right: 20px;
    z-index:9999;
`

const PostCode = (props:any):JSX.Element => {
    const {search, setsearch, closed} = props;
    const [visible, setVisible] = useState(true); //autoclose될 때 닫기 버튼 사라지도록

    const complete = (data:any) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        };

        setsearch({
            ...search,
            address:fullAddress,
        });

        setVisible(false);
    }

    return (
        <ModalWrapper>
            {visible && 
            <ButtonStyle onClick={closed}>
                <IoMdClose size={24} color='#999'/>
            </ButtonStyle>
            }
            <DaumPostcodeEmbed
                className='postModal'
                autoClose
                onComplete={complete} />
        </ModalWrapper>
    );
}

export default PostCode;