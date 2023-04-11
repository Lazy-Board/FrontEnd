import styled from "styled-components";
import { Link } from "react-router-dom";

const Content = styled.div`
    width:448px;
    min-height: 100vh;
    margin: 0 auto;
    background-color:white;
`;

// 이메일 인증에서 가입완료 클릭 => 회원가입 완료 화면

const UserSuccess = ():JSX.Element => {
    return (
        <Content className="text-slate-900 dark:text-slate-100 dark:bg-neutral">
            <div className="py-48">
                <img src="/images/celebrating.png" alt="회원가입 축하" 
                className="w-48 h-48 mx-auto mt-24 object-contain"/>
                <p className="mt-10 text-xl text-center">Lazier 회원가입이 완료되었습니다!</p>
                <Link to={`/login`} className="btn btn-primary mt-8 mb-24 text-center">
                    로그인 화면으로
                </Link>
            </div>
        </Content>
    )
}

export default UserSuccess;