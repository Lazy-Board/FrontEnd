import styled from 'styled-components';
import { api } from '../../atom/signin';
import { FiEdit2 } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUserInfo, userType, userInfoState } from '../../atom/users';
import DetailTopBar from '../MenuBars/DetailTopBar';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;

const EditUserInfo = ():JSX.Element => {
    // ${API_URL}/user/search 유저정보 불러오기 get
    const queryClient = useQueryClient();
    const { data:userInfo } = useQuery(['userInfo'], getUserInfo, {
        refetchOnWindowFocus:false,
        staleTime:Infinity,
    })
    // 처음 가입 시에는 userImg로 나오고, 사용자가 이미지를 변경하면 그 이미지로 출력되도록 - 이미지 관련해서 추가되면 더 수정해야 함
    const userImg = '/images/user-icon.png';
    const [newImg, setNewImg] = useState(userImg);
    // user 정보 받아와서 넣어주기
    const [userData, setUserData] = useRecoilState<userType>(userInfoState)
    const { phoneNumber, socialType, userEmail, userName } = userData;

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
        if (userInfo) {
            setUserData(userInfo);
        }
    },[userInfo]);

    const editUserMutation = useMutation(() =>
        api.put(`/user/update`, { 
            phoneNumber:phoneNumber,
            socialType:socialType,
            userEmail:userEmail,
            userName:userName
        })
    );

    const onSubmitData = async(e:React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await editUserMutation.mutateAsync(userInfo);
            setUserData(response.data)
            queryClient.invalidateQueries(['userInfo']);
        } catch (error){
            console.log(`Error: \n${error}`)
        }
    }

    return (
        <>
        <DetailTopBar title="프로필 수정"/>
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
                className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none rounded-md focus:bg-white/75 transition-colors"/>

                <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>휴대폰 번호</label>
                <input type="text" name='phoneNumber'
                value={phoneNumber}
                onChange={changeName}
                className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none rounded-md focus:bg-white/75 transition-colors"/>

                <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>이메일 주소</label>
                <input type="email" name='userEmail'
                value={userEmail}
                onChange={changeName}
                disabled={socialType==='google' ? true : false}
                className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 text-base outline-none rounded-md disabled:bg-stone-200 disabled:text-stone-400 focus:bg-white/75 transition-colors"/>
                <div className='flex justify-between'>
                    <button className='w-full mt-8 btn btn-primary' type='submit'>
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