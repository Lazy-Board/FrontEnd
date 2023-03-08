import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DetailTopBar = ({ title }: any) => {
  const navigate = useNavigate();
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

  return (
    <Top className="h-14 flex items-center justify-center bg-white shadow-sm">
      <button
        onClick={() => navigate("/")}
        className="absolute left-3 hover:text-green-400 transition-colors"
      >
        <FiArrowLeft size={20} />
      </button>
      {title}
    </Top>
  );
};

export default DetailTopBar;
