import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiUser } from "react-icons/bi";

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

  if (locationNow.pathname === "/login" || locationNow.pathname === "/signup" || locationNow.pathname === "/auth-success")
    return <></>;

  // 로그인/회원가입 등에서는 보이지 않게 처리해야
  if (locationNow.pathname === "/")
    return (
      <Top className="h-14 flex items-center justify-between px-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">LAZIER</h2>
        <div className="flex gap-x-2">
          <label
            htmlFor="confirm-modal"
            className="mr-3 cursor-pointer hover:text-green-400 transition-colors"
          >
            <FiLogOut size={20} />
          </label>
          <Link to={"/user"} className="hover:text-green-400 transition-colors">
            <BiUser size={20} />
          </Link>
        </div>
      </Top>
    );

  // 위젯 따라 타이틀 변경-분리해서 따로 만들지 어쩔지 고민 중
  return <></>;
};

export default TopBar;
