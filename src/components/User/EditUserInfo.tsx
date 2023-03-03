import styled from 'styled-components';
// import { api } from '../../atom/signin';
import axios from 'axios';
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
    const accessToken = localStorage.getItem("accessToken");
    const queryClient = useQueryClient();
    const { data:userInfo } = useQuery(['userInfo'], getUserInfo, {
        refetchOnWindowFocus:false,
        staleTime:Infinity,
    })
    const userImg = '/images/user-icon.png';
    const [newImg, setNewImg] = useState(userImg);
    const [userData, setUserData] = useRecoilState<userType>(userInfoState)
    const { phoneNumber, profile, socialType, userEmail, userName } = userData;

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

    // const editUserMutation = useMutation(() =>
    //     api.put(`/user/update`, { 
    //         phoneNumber:phoneNumber,
    //         profile: profile,
    //         socialType:socialType,
    //         userEmail:userEmail,
    //         userName:userName
    //     })
    // );

    const editUserMutation = useMutation((formData: FormData) =>
        axios.put(`/user/update`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
            },
        })
    );

    const onSubmitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('phoneNumber', phoneNumber);
            formData.append('profile', profile);
            formData.append('socialType', socialType);
            formData.append('userEmail', userEmail);
            formData.append('userName', userName);
            formData.append('image', newImg);
        
            const response = await editUserMutation.mutateAsync(formData);
            setUserData(response.data);
            queryClient.invalidateQueries(['userInfo']);
            alert('저장되었습니다.');
        } catch (error) {
            console.log(`Error: \n${error}`);
        }
    };

    // const onSubmitData = async(e:React.SyntheticEvent) => {
    //     e.preventDefault();
    //     try {
    //         const response = await editUserMutation.mutateAsync(userInfo);
    //         setUserData(response.data)
    //         queryClient.invalidateQueries(['userInfo']);
    //         alert('저장되었습니다.')
    //     } catch (error){
    //         console.log(`Error: \n${error}`)
    //     }
    // }

    return (
        <>
        <DetailTopBar title="프로필 수정"/>
        <Content className="max-w-md flex flex-col items-center justify-center bg-stone-100">
        <form className='h-fit my-24' action='#' onSubmit={onSubmitData}>
            <div className='relative mx-auto'>
                <img src={!profile ? newImg : profile}
                alt="프로필 이미지" 
                className="w-24 h-24 mx-auto rounded-full bg-gray-300 object-cover"
                />
                <input type='file' id='img-upload' accept=".gif, .jpg, .png" className='hidden' onChange={onFileChange} />
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