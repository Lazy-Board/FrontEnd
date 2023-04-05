import styled from 'styled-components';
import { useState } from 'react';;
import DetailTopBar from '../MenuBars/DetailTopBar';
import { api } from '../../atom/signin';
// 비밀번호 변경 부분 분리함
// 구글 유저일 경우 비밀번호 변경 불가능해야 함!!

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
`;

const UpdatePassword = ():JSX.Element => {
    const [userPassword, setUserPassword] = useState({
        password:'',
        newPassword:''
    })

    const {password, newPassword} = userPassword;

    const changePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setUserPassword({
            ...userPassword,
            [name]: value,
        });
    }

    const onSubmitData = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.put(`/user/updatePassword`,{
                newPassword:newPassword,
                password:password
            })
            alert('비밀번호가 변경되었습니다.')
        } catch (error) {
            alert(`Error: \n${error}`)
        }
        // 성공 시 저장됐다는 alert창 띄우고 실패 시 실패했다는 alert 띄우기
    }

    return (
        <>
        <DetailTopBar title="비밀번호 변경"/>
        <Content className="max-w-md flex flex-col items-center justify-center bg-stone-100">
            <img src="/images/reset-password.png" alt="비밀번호 변경" 
                className="w-32 h-32 mx-auto mt-20 object-contain"/>
            <form className='w-full h-fit px-16 mt-14 mb-24' action='#' onSubmit={onSubmitData}>
                <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>현재 비밀번호</label>
                <input type="password" placeholder='현재 비밀번호를 입력해주세요'
                value={password} name="password"
                onChange={changePassword} required
                className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                <label className='block mt-8 mb-2 text-sm text-gray-900 dark:text-white text-left'>변경할 비밀번호</label>
                <input type="password" placeholder='변경할 비밀번호를 입력해주세요' name='newPassword'
                value={newPassword} 
                onChange={changePassword} required
                className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>
                <div className='flex justify-between'>
                    <button className='w-full mt-8 btn btn-primary' type='submit' 
                    disabled={!password || !newPassword ? true : false}>
                        이메일 전송
                    </button>
                </div>
            </form>
        </Content>
        </>
    )
}

export default UpdatePassword;