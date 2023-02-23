import styled from 'styled-components';
import { FiEdit2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import DetailTopBar from '../MenuBars/DetailTopBar';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;

const EditUserInfo = ():JSX.Element => {
    const userImg = '/images/user-icon.png';

    const [newImg, setNewImg] = useState(userImg);
    const [userData, setUserData] = useState({
        userEmail:'example@gmail.com',
        userName:'김철수',
        nickName:'야호오',
        phoneNumber:'010-1234-5678',
        password:'',
        confirmPassword:''
    })

    const {userEmail, userName, nickName, phoneNumber, password, confirmPassword} = userData;
    // 이메일, 폰번호, 비밀번호는 형식 검사 필요(정규표현식?)
    // email source가 google이면 수정불가로

    const changeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{files}} = event;
        const ImgFile = (files as FileList)[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: any) => {
            const {
                currentTarget : {result}
            } = finishedEvent;
            setNewImg(result);
        }
        reader.readAsDataURL(ImgFile);
    };

    useEffect(()=>{
        if (!userImg){
            setNewImg(newImg)
        }
    },[]);

    const onSubmitData = (e:React.SyntheticEvent) => {
        e.preventDefault();
        // 성공 시 저장됐다는 alert창 띄우고 실패 시 실패했다는 alert 띄우기
    }

    return (
        <>
        <DetailTopBar title="사용자 정보 수정"/>
        <Content className="max-w-md flex flex-col items-center justify-center bg-stone-100">
            <form className='h-fit my-24' action='#' onSubmit={onSubmitData}>
                <div className='relative mx-auto'>
                    <img src={newImg}
                    alt="프로필 이미지" 
                    className="w-24 h-24 mx-auto rounded-full bg-gray-300 object-cover"
                    />
                    <input type='file' id='img-upload' accept=".gif, .jpg, .png" className='hidden' onChange={onFileChange}/>
                    <label htmlFor='img-upload' className='absolute p-1 bottom-0 right-28 bg-emerald-400 border-2 border-cyan-600 rounded-full hover:bg-cyan-600 transition-colors cursor-pointer'>
                    <FiEdit2 color='white'/>
                    </label>
                </div>
                <div className="w-80 mt-10 space-y-3">
                    <label className='block text-sm text-gray-900 dark:text-white text-left'>이름</label>
                    <input type="text" name='userName'
                    value={userName}
                    onChange={changeName}
                    className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block text-sm text-gray-900 dark:text-white text-left'>닉네임</label>
                    <input type="text" name='nickName'
                    value={nickName}
                    onChange={changeName}
                    className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>휴대폰 번호</label>
                    <input type="text" name='phoneNumber'
                    value={phoneNumber}
                    onChange={changeName}
                    className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>이메일 주소</label>
                    <input type="email" name='userEmail'
                    value={userEmail}
                    onChange={changeName}
                    className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>비밀번호 변경</label>
                    <input type="password" placeholder='변경할 비밀번호를 입력해주세요'
                    value={password}
                    onChange={changeName}
                    className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>비밀번호 확인</label>
                    <input type="password" placeholder='변경한 비밀번호를 다시 입력해주세요' name='confirmPassword'
                    value={confirmPassword}
                    onChange={changeName}
                    className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>
                    <div className='flex justify-between'>
                        <button className='w-1/3 mt-8 btn btn-outline'>
                            취소
                        </button>
                        {/* 변화가 없는 상태에서는 disabled? */}
                        <button className='w-1/3 mt-8 btn btn-primary' type='submit'>
                            저장
                        </button>
                    </div>
                </div>
            </form>
        </Content>
        </>
    )
}

export default EditUserInfo;