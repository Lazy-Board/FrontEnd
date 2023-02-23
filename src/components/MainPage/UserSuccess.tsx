import styled from "styled-components";
import { Link } from "react-router-dom";

const Content = styled.div`
    width:448px;
    min-height: 100vh;
    margin: 0 auto;
    color: black;
    background-color:white;
`;

// 회원가입 완료 화면

const UserSuccess = ():JSX.Element => {
    return (
        <Content>
            <div className="py-48">
                <img src="/images/celebrating.png" alt="회원가입 축하" 
                className="w-48 h-48 mx-auto mt-24 object-contain"/>
                <p className="mt-10 text-xl">Lazier 회원가입을 축하합니다!</p>
                <Link to={`/`} className="btn btn-primary mt-8 mb-24">
                    로그인 화면으로
                </Link>
            </div>
        </Content>
    )
}

export default UserSuccess;