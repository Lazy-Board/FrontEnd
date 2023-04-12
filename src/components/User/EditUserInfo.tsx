import styled from 'styled-components';
import { imgApi, api } from '../../atom/signin';
import { FiEdit2 } from 'react-icons/fi';
import { VscLoading } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUserInfo, userType, userInfoState } from '../../atom/users';
import DetailTopBar from '../MenuBars/DetailTopBar';
import { ErrorModal } from '../Modal/ErrorModal';
import SuccessModal from '../Modal/SuccessModal';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;

const Save = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    .load {
        margin-right:8px;
        animation: spin 1s linear infinite;
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
`

const EditUserInfo = ():JSX.Element => {
    const queryClient = useQueryClient();
    const { data:userInfo } = useQuery(['userInfo'], getUserInfo, {
        refetchOnWindowFocus:false,
        staleTime:Infinity,
    })
    const [load, setLoad] = useState('정보 수정');
    const [userData, setUserData] = useRecoilState<userType>(userInfoState)
    const { phoneNumber, profile, socialType, userEmail, userName } = userData;

    const [newImg, setNewImg] = useState<any>('/images/user-icon.png');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState<string | null>(null);

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
        if (userInfo) {
            setUserData(userInfo);
        }
        if (profile){
            setNewImg(profile);
        }
    },[userInfo,profile]);

    const editUserMutation = useMutation((inputData:any) =>
        api.put(`/user/update`, inputData)
    );

    const onSubmitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
        const imgFile:any = document.querySelector('#img-upload');
        formData.append('multipartFile', imgFile.files[0])
        try {
            setLoad('업데이트 중...')
            const { data:ImgData } = await imgApi.post(`/user/image`, formData);
            const { fileName, url } = ImgData;
            const response = await editUserMutation.mutateAsync({
                phoneNumber: phoneNumber,
                profile: 
                url === undefined && profile === undefined ? null
                : url === undefined && profile !== undefined ? profile
                : url,
                socialType: socialType,
                userEmail: userEmail,
                userName: userName
            });
            setLoad('정보 수정')
            setNewImg(!url ? '/images/user-icon.png' : url);
            setUserData(response.data);
            setSuccess('프로필이 업데이트 되었습니다!');
            queryClient.invalidateQueries(['userInfo']);
        } catch (error:any) {
            setError(error.response.data.msg);
        }
    };

    return (
        <>
        <DetailTopBar title="프로필 수정"/>
        <Content className="max-w-md flex flex-col items-center justify-center bg-stone-100 dark:bg-neutral dark:text-slate-200">
        <form className='h-fit my-24' action='#' onSubmit={onSubmitData}>
            <div className='relative mx-auto'>
                <img src={newImg}
                alt="프로필 이미지" 
                className="w-24 h-24 mx-auto rounded-full bg-gray-300 object-cover"
                />
                <input type='file' id='img-upload' name='multipartFile' accept="image/*" className='hidden' onChange={onFileChange} />
                <label htmlFor='img-upload' className='absolute p-1 bottom-0 right-28 bg-emerald-400 border-2 border-cyan-600 rounded-full hover:bg-cyan-600 transition-colors cursor-pointer'>
                <FiEdit2 color='white'/>
                </label>
            </div>
            <div className="w-80 mt-10 space-y-3">
                <label className='block text-sm text-gray-900 dark:text-white text-left'>이름</label>
                <input type="text" name='userName'
                value={userName}
                onChange={changeName} required
                placeholder='이름을 작성해주세요!'
                className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 dark:text-slate-200 text-base outline-none rounded-md focus:bg-white/50 transition-colors"/>

                <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>휴대폰 번호</label>
                <input type="text" name='phoneNumber'
                value={phoneNumber}
                onChange={changeName}
                placeholder='01012345678'
                className="w-full p-2 bg-white/25 border-b border-stone-300 text-neutral-600 dark:text-slate-200 text-base outline-none rounded-md focus:bg-white/50 transition-colors"/>

                <label className='block mb-2 text-sm text-gray-900 dark:text-white text-left'>이메일 주소</label>
                <input type="email" name='userEmail'
                value={userEmail}
                onChange={changeName} required
                disabled={true}
                placeholder='example@email.com'
                className="w-full p-2 bg-white/25 dark:bg-white/50 border-b border-stone-300 text-neutral-600 text-base outline-none rounded-md disabled:bg-stone-200 disabled:text-stone-600 focus:bg-white/75 transition-colors"/>
                <div className='flex justify-between'>
                    <Save 
                    className='w-full mt-8 btn btn-primary disabled:bg-slate-300 disabled:bg-opacity-50 disabled:text-slate-600' 
                    type='submit'
                    disabled={!userName || !userName || load === '업데이트 중...' ? true : false}>
                        {load === '업데이트 중...' && <VscLoading className="load"/>}
                        {load}
                    </Save>
                </div>
            </div>
        </form>
        {error && (
        <ErrorModal message={error} onClose={() => setError(null)} />
        )}
        {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
        )}
        </Content>
        </>
    )
}

export default EditUserInfo;