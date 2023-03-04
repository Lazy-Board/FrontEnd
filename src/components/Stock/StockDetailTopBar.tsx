import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const StockDetailTopBar = ({ title }: any) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
    location.reload();
  };

  return (
    <Top className="h-14 flex items-center justify-center bg-white shadow-sm">
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

export default StockDetailTopBar;
