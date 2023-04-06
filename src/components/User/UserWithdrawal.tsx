import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { withdrawUser } from "../../atom/users";
import DetailTopBar from "../MenuBars/DetailTopBar";

const Content = styled.div`
    width:448px;
    min-height: 100vh;
    margin: 0 auto;
    color: black;
`;

// 회원탈퇴 화면

const UserWithdrawal = ():JSX.Element => {
    const navigate = useNavigate();

    const withdraw = (e:any) => {
        e.preventDefault();
        withdrawUser();
        alert('탈퇴되었습니다.')
        navigate('/login')
    }

    return (
        <>
        <DetailTopBar title="회원 탈퇴"/>
        <Content className="bg-stone-100 dark:bg-neutral dark:text-slate-100">
            <div className="py-48">
                <img src="/images/sad.png" alt="회원 탈퇴" 
                className="w-36 h-36 mx-auto mt-24 bg-stone-300 rounded-full object-contain"/>
                <p className="mt-10 text-xl text-center">정말로 탈퇴하시겠습니까?</p>
                <div className="text-center">
                    <button className="btn btn-primary mt-8 mr-8 mb-24" onClick={withdraw}>
                        네
                        {/* 누르면 성공적으로 탈퇴가 완료되었습니다 띄우고 로그인화면으로 */}
                    </button>
                    <Link to={'/user'} className="btn btn-secondary mt-8 mb-24">
                        아니오
                        {/* 계정 관리 화면으로 */}
                    </Link>
                </div>
            </div>
        </Content>
        </>
    )
}

export default UserWithdrawal;