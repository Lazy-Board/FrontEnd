import { Link, useLocation } from "react-router-dom";
// import { FiSettings } from "react-icons/fi"; 
import { TbApps } from "react-icons/tb";
import { BiHome, BiCalendarAlt } from "react-icons/bi";
import styled from 'styled-components';

const Bottom = styled.div`
    width: 100%;
    position: fixed;
    bottom:0;
    z-index:200;
    @media screen and (max-width: 3840px) {
        width:448px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    @media screen and (max-width: 440px) {
        width: 100%;
    }
`

const BottomBar = ():JSX.Element => {
    const locationNow = useLocation();
    if (locationNow.pathname === "/login" || locationNow.pathname === "/signup")
    return (
        <></>
    );

    // 추후 링크 수정하기
    return (
        <Bottom className="h-16 flex items-center justify-around bg-white border-t border-t-neutral-300">
            <Link to={`/`} className="px-8 hover:text-green-400 transition-colors">
                <BiHome size={24}/>
            </Link>
            <Link to={`/`} className="px-8 hover:text-green-400 transition-colors">
                <BiCalendarAlt size={24}/>
            </Link>
            <button disabled={locationNow.pathname==='/' ? false : true} className="px-8 hover:text-green-400 transition-colors disabled:text-zinc-400">
                <TbApps size={24}/>
            </button>
        </Bottom>
    )
}

export default BottomBar;