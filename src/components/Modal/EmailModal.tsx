import { BsCheckCircle } from "react-icons/bs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Max = styled.p`
  max-width: 215px;
`;

export const EmailModal = (props: any) => {
  const navigate=useNavigate();
  const warp=()=>{
    props.onClose
    navigate('/login')
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-80 bg-green-50 p-5 rounded-lg shadow-lg border border-gray-300 min-w-1/2">
          <div className="flex items-center">
          <BsCheckCircle fill="#66cc8a" size={48} className="h-12" />
            <Max className="text-sm ml-3 text-left text-green-700">
              {props.message}
            </Max>
          </div>
          <div className="mt-6">
            <button
              className="w-32 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              onClick={warp}
            >
              로그인으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
