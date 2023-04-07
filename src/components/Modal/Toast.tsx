import styled from "styled-components";

const SetPosition=styled.div`
    left: -200px;
    transform: translate(-50%, 0%);
    transition: all 0.2s ease-out;
`

const Progress=styled.div`
    width:100%;
    animation:progress 3s linear;
    animation-iteration-count : infinite; 
    @keyframes progress{
        from{
            width:100%;
        }to{
            width:0;
        }
    }
`

const Toast=({ msg, closed, isVisible }: any)=>{
    
    return (
        <SetPosition className={`fixed toast-box ${isVisible ? 'visible' : ''}`}>
            <div className="w-72 relative flex items-center justify-between max-w-xs p-4 bg-white dark:bg-slate-900 border rounded-md shadow-sm overflow-hidden">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd" />
                    </svg>
                    <p className="ml-3 text-sm font-bold text-green-600 dark:text-green-500">{msg}</p>
                </div>
                <span className="inline-flex items-center cursor-pointer"
                onClick={closed}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
                {isVisible && <Progress className="h-1 absolute left-0 bottom-0 bg-green-600"></Progress>}
            </div>
        </SetPosition>
    )
}

export default Toast;

// 토스트 메시지 적용 코드 (메인에서 저장하는 동작에 사용?할 수도? 적용은 안 해봄)

// const [isVisible, setIsVisible] = useState(false);
    
//     const showToast=()=>{
//         const toast=document.querySelector('.toast-box') as HTMLElement;
//         toast!.style.left= isVisible ? '25%' : '50%';
//         toast!.style.opacity= isVisible ? '0' : '1';
//         setIsVisible(!isVisible)
//     }

//     useEffect(() => {
//         if (isVisible) {
//             const timer = setTimeout(() => {
//                 check();
//             }, 2500);
//             return () => clearTimeout(timer);
//         }
//     }, [isVisible]);

{/* <Toast msg={'저장되었습니다!'} 
    closed={showToast}
    isVisible={isVisible}
/> */}