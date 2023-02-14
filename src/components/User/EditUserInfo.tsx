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
    const userImg = 'https://icons-for-free.com/download-icon-business+human+person+profile+seo+user+icon-1320186746402784223_512.png';

    const [newImg, setNewImg] = useState(userImg);

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

    return (
        <>
        <DetailTopBar title="사용자 정보 수정"/>
        <Content className="max-w-md flex flex-col items-center justify-center bg-stone-100">
            <form className='h-fit' action='#'>
                <div className='relative mx-auto'>
                    <img src={newImg}
                    alt="프로필 이미지" 
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                    />
                    <input type='file' id='img-upload' accept=".gif, .jpg, .png" className='hidden' onChange={onFileChange}/>
                    <label htmlFor='img-upload' className='absolute p-1 bottom-0 right-28 bg-emerald-400 border-2 border-cyan-600 rounded-full hover:bg-cyan-600 transition-colors cursor-pointer'>
                    <FiEdit2 color='white'/>
                    </label>
                </div>
                <div className="w-80 mt-10 space-y-3">
                    <label className='block text-sm text-gray-900 dark:text-white text-left'>이름</label>
                    <input type="text" 
                    className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>휴대폰 번호</label>
                    <input type="text" 
                    className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>이메일 주소</label>
                    <input type="email" 
                    className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>

                    <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>비밀번호 변경</label>
                    <input type="password" 
                    className="w-full p-2 bg-stone-100 border-b border-stone-300 text-neutral-600 text-base outline-none focus:bg-white/75 transition-colors"/>
                    <div className='flex justify-between'>
                        <button className='w-1/3 mt-8 btn btn-outline'>
                            취소
                        </button>
                        {/* 변화가 없는 상태에서는 disabled? */}
                        <button className='w-1/3 mt-8 btn btn-primary'>
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