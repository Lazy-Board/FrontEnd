import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Top = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 200;
  @media screen and (max-width: 3840px) {
    width: 448px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  @media screen and (max-width: 440px) {
    width: 100%;
  }
`;

const DetailTopBar = ({ title }: any) => {
  const navigate = useNavigate();
  const locationNow = useLocation();

  const goHome = () => {
    if (locationNow.pathname === '/exchange' || locationNow.pathname === '/stock') {
      navigate("/");
      location.reload();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <Top className="h-14 flex items-center justify-center bg-white dark:bg-neutral shadow-md dark:shadow-slate-700 dark:text-slate-100">
      <button
        onClick={goHome}
        className="absolute left-3 hover:text-green-400 transition-colors"
      >
        <FiArrowLeft size={20} />
      </button>
      {title}
    </Top>
  );
};

export default DetailTopBar;
