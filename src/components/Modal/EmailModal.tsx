import { BiErrorCircle } from "react-icons/bi";
import styled from "styled-components";

const Max = styled.p`
  max-width: 215px;
`;

export const EmailModal = (props: any) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-80 bg-red-50 p-5 rounded-lg shadow-lg border border-red-200 min-w-1/2">
          <div className="flex items-center">
            <BiErrorCircle fill="#de3737" size={48} className="h-12" />
            <Max className="text-sm ml-3 text-left text-red-700">
              {props.message}
            </Max>
          </div>
          <div className="mt-6">
            <button
              className="w-28 px-4 py-2 text-sm bg-red-400 text-white rounded hover:bg-red-600 transition-colors"
              onClick={props.onClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
