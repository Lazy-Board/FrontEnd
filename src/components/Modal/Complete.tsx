import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonStyle=styled.div`
    margin-right:50px;
`

const Complete = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <>
        <input type="checkbox" id="complete-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box w-72">
            <p className="py-4 font-semibold">
                회원가입을 축하드립니다! <br/>
                등록하신 이메일로 인증을 완료하세요.
            </p>
            <ButtonStyle className="modal-action">
                <label
                htmlFor="complete-modal"
                className="btn btn-primary"
                onClick={()=>navigate('/login')}
                >
                    로그인 화면으로
                </label>
            </ButtonStyle>
            </div>
        </div>
        </>
    );
};

export default Complete;