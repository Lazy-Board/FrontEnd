import { BsCheckCircle } from "react-icons/bs";
import styled from "styled-components";

const Max=styled.p`
    max-width:215px;
`
const ModalWrapper=styled.div`
    top:0;
    left:50%;
    transform: translate(-50%, 0%);
    z-index:1000;
`

const SuccessModal = (props: any) => {
    return (
        <ModalWrapper className='fixed transition-all'>
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-80 bg-green-50 p-5 rounded-lg shadow-lg border border-gray-300 min-w-1/2">
                <div className="flex items-center">
                    <BsCheckCircle fill="#66cc8a" size={48} className="h-12"/>
                    <Max className="text-sm ml-3 text-left text-green-700">
                        {props.message}
                    </Max>
                </div>
                <div className="mt-6 text-center">
                    <button
                    className="w-28 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={props.onClose}
                    >
                    닫기
                    </button>
                </div>
            </div>
        </div>
        </ModalWrapper>
    );
};

export default SuccessModal;
