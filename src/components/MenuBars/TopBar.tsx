import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import ThemeChange from "./ThemeChange";

const Top = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 200;
  @media screen and (max-width: 4200px) {
    width: 448px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  @media screen and (max-width: 440px) {
    width: 100%;
  }
`;

const TopBar = (): JSX.Element => {
  const locationNow = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  if (locationNow.pathname === "/")
    return (
      <Top className="h-14 flex items-center justify-between px-4 bg-white dark:bg-neutral shadow-md dark:shadow-slate-700 dark:text-slate-100 transition-colors">
        <h2 className="text-2xl mt-2 font-semibold cursor-pointer transition-colors title-font-only" 
        onClick={scrollToTop}>lazier.</h2>
        <div className="flex gap-x-2">
          <ThemeChange />
          <label
            htmlFor="confirm-modal"
            className="mr-3 cursor-pointer"
          >
            <FiLogOut size={20} className="hover:text-green-400 transition-colors"/>
          </label>
          <Link to={"/user"} className=" dark:text-slate">
            <BiUser size={20} className="hover:text-green-400 transition-colors"/>
          </Link>
        </div>
      </Top>
    );

  else return <></>;
};

export default TopBar;
