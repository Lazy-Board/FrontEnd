import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiLogOut,FiArrowLeft } from "react-icons/fi";
import { BiUser } from "react-icons/bi";

const Top = styled.div`
    width: 100%;
    position: fixed;
    top:0;
    @media screen and (max-width: 1920px) {
        width:448px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    @media screen and (max-width: 440px) {
        width: 100%;
    }
`

const TopBar = ():JSX.Element => {
    const locationNow = useLocation();
    
    if (locationNow.pathname==='/') 
    return (
        <Top className="h-14 flex items-center justify-between px-4 bg-white">
            <h2 className='text-lg font-semibold'>LAZIER</h2>
            <div className="flex gap-x-2">
                <button className='mr-3'>
                    <FiLogOut size={20} />
                </button>
                <Link to={'/user'}>
                    <BiUser size={20} />
                </Link>
            </div>
        </Top>
    );

    return (
        <Top className="h-14 flex items-center justify-center bg-white">
            <Link to={`/`} className='absolute left-3'>
                <FiArrowLeft size={20} />
            </Link>
            {/* 위젯 따라 타이틀 변경 */}
            {`계정 관리`}
        </Top>
    );
};

export default TopBar;