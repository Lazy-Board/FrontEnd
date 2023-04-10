import styled from 'styled-components';
import { useState } from 'react';
import { api } from '../atom/signin';
import DetailTopBar from '../components/MenuBars/DetailTopBar';
import { ErrorModal } from '../components/Modal/ErrorModal';
import SuccessModal from '../components/Modal/SuccessModal';

// 로그인 화면 -> 비밀번호 찾기

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
`;

const FindPassword = ():JSX.Element => {
    const [userInfo, setInfo] = useState({
        phoneNumber:'',
        userEmail:''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState<string | null >(null);

    const {phoneNumber, userEmail} = userInfo;

    const infoChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setInfo({
            ...userInfo,
            [name]: value,
        });
    }

    const onSubmitData = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post(`/user/find-password`,{
                phoneNumber: phoneNumber,
                userEmail: userEmail
            })
            setSuccess('임시 비밀번호가 메일로 전송되었습니다!')
        } catch (error:any){
            setError(error.response.data.msg);
        }
        // 성공 시 메일이 전송됐다는 alert창 띄우고 실패 시 실패했다는 alert 띄우기
    }

    return (
        <>
        <DetailTopBar title="비밀번호 찾기"/>
        <Content className="max-w-md flex flex-col items-center justify-center bg-stone-100 dark:bg-neutral dark:text-slate-200">
            <img src="/images/password.png" alt="비밀번호 찾기" 
                className="w-32 h-32 mx-auto mt-20 object-contain"/>
            <form className='w-full h-fit px-16 mt-14 mb-24' action='#' onSubmit={onSubmitData}>
                <label className='block mb-2 text-sm text-gray-900 dark:text-slate-100 text-left'>전화번호</label>
                <input type="text" placeholder='전화번호를 입력해주세요'
                value={phoneNumber} name="phoneNumber"
                onChange={infoChange} required
                className="w-full p-2 bg-white/25 dark:bg-white/50 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors rounded-md dark:text-slate-100"/>

                <label className='block mt-8 mb-2 text-sm text-gray-900 dark:text-slate-100 text-left'>이메일</label>
                <input type="email" placeholder='이메일을 입력해주세요' name='userEmail'
                value={userEmail}
                onChange={infoChange} required
                className="w-full p-2 bg-white/25 dark:bg-white/50 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors rounded-md dark:text-slate-100"/>
                <div className='mt-10 flex justify-between'>
                    <button className='w-full mt-8 btn btn-primary disabled:bg-slate-300 disabled:bg-opacity-50 disabled:text-slate-400' type='submit' disabled={ !phoneNumber || !userEmail ? true : false }>
                        메일 전송
                    </button>
                </div>
            </form>
        </Content>
        {error && (
        <ErrorModal message={error} onClose={() => setError(null)} />
        )}
        {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
        )}
        </>
    )
}

export default FindPassword;