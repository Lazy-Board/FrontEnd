import { useLocation, useNavigate } from "react-router-dom";
import { TbApps } from "react-icons/tb";
import { BiHome } from "react-icons/bi";
import styled from 'styled-components';

const Bottom = styled.div`
    width: 100%;
    position: fixed;
    bottom:0;
    z-index:200;
    @media screen and (max-width: 4200px) {
        width:448px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    @media screen and (max-width: 440px) {
        width: 100%;
    }
`

const BottomBar = ():JSX.Element => {
    const navigate = useNavigate();
    const locationNow = useLocation();
    
    if (locationNow.pathname === "/login" || locationNow.pathname === "/signup" || locationNow.pathname === "/auth-success" || locationNow.pathname === "/find-password" || locationNow.pathname === "/select-widget")
    return (
        <></>
    );

    const toMain = () => {
        if (locationNow.pathname.includes('exchange') || locationNow.pathname.includes('stock')) {
            navigate("/");
            location.reload();
        }
        navigate("/");
    }

    return (
        <Bottom className="h-16 flex items-center justify-around bg-white dark:bg-neutral border-t border-t-neutral-300 dark:text-slate-100 dark:border-t-slate-600">
            <button 
            onClick={toMain} className="px-8 hover:text-green-400 transition-colors">
                <BiHome size={24}/>
            </button>
            <button disabled={locationNow.pathname==='/' ? false : true} className="px-8 hover:text-green-400 transition-colors disabled:text-slate-400"
            onClick={()=>navigate('/user/update-widget')}
            >
                <TbApps size={24}/>
            </button>
        </Bottom>
    )
}

export default BottomBar;