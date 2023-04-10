import DaumPostcodeEmbed from 'react-daum-postcode';
import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import styled from 'styled-components';

const ModalWrapper=styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    background:rgba(139, 146, 156, 0.2);
    z-index:9000;
    .postModal {
        max-width:390px;
        min-height:540px;
        padding: 15px 8px;
        padding-top: 45px;
        position:fixed;
        left:50%;
        transform: translate(-50%, 35%);
        border-radius:10px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        z-index:9000;
    }
`

const ButtonStyle=styled.button`
    position: absolute;
    top: 37%;
    right: 10px;
    z-index:9999;
`

const Wrapper = styled.div`
    width:390px;
    height:540px;
    margin:0 auto;
`

const PostCode = (props:any):JSX.Element => {
    const $html = document.querySelector('html');
    const theme = $html?.getAttribute('data-theme');
    const { search, setsearch, closed } = props;
    const [visible, setVisible] = useState(true); //autoclose될 때 닫기 버튼 사라지도록

    const themeProps = {
        bgColor: theme === 'night' ? "#0f172a" : "ECECEC",
        searchBgColor: theme === 'night' ? "#0f172a" : "FFFFFF",
        contentBgColor: theme === 'night' ? "#0f172a" : "FFFFFF",
        pageBgColor: theme === 'night' ? "#334155" : "FAFAFA",
        textColor: theme === 'night' ? "#CCCCCC" : "333333",
        queryTextColor: theme === 'night' ? "#CCCCCC" : "222222"
    }

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
        }

        setsearch({
            ...search,
            address:fullAddress,
        })

        setVisible(false);
    }

    return (
        <ModalWrapper className={`${!visible ? 'invisible' : ''}`}>
            <Wrapper className='relative'>
                {visible && (
                    <ButtonStyle onClick={closed}>
                        <IoMdClose size={24} color='#999'/>
                    </ButtonStyle>
                )}
                <DaumPostcodeEmbed
                className='postModal bg-white dark:bg-neutral'
                autoClose
                theme={themeProps}
                onComplete={complete} />
            </Wrapper>
        </ModalWrapper>
    );
}

export default PostCode;