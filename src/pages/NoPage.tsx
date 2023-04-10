import styled from "styled-components";
import { Link } from "react-router-dom";

const Content = styled.div`
    width:448px;
    min-height: 100vh;
    margin: 0 auto;
    background-color:white;
`;

// 존재하지 않는 링크 접근 시 출력되는 페이지

const NoPage = ():JSX.Element => {
    return (
        <Content className="text-slate-900 dark:text-slate-100 dark:bg-neutral">
            <div className="flex flex-col justify-center items-center pt-36">
                <img src="/image/404.png" alt="404 페이지" 
                className="w-80 h-80 object-contain"/>
                <p className="mt-4 text-6xl text-center font-bold">
                    4
                    <span className="text-blue-500">0</span>
                    4
                </p>
                <p className="mt-4 text-xl text-center font-semibold">
                    이런! 요청하신 페이지를 찾을 수 없습니다.
                </p>
                <p className="mt-4 text-base text-center">
                    페이지 주소를 잘못 입력하셨거나, <br/>
                    페이지 주소가 변경 또는 삭제되었습니다.
                </p>
                <Link to={`/`} className="w-1/3 btn btn-secondary mt-8 mb-24 text-center">
                    메인 화면으로
                </Link>
            </div>
        </Content>
    )
}

export default NoPage;