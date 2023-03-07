import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserInfo } from '../../atom/users';
import DetailTopBar from '../MenuBars/DetailTopBar';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;

const UserProfile = ():JSX.Element => {
    const navigate = useNavigate()
    const { data:userInfo, isLoading } = useQuery(['userInfo'], getUserInfo, {
        refetchOnWindowFocus:false,
        staleTime:Infinity,
    })

    const menus = [
        {id:1,name:'프로필 수정', link:'user/userInfo'},
        {id:2,name:'비밀번호 변경', link:'user/update-password'},
        {id:3,name:'회원 탈퇴', link:'user/withdrawal'},
    ]
    
    return(
        <>
        <DetailTopBar title={'계정 관리'}/>
        <Content className="max-w-md bg-stone-100 flex items-center content-center">
            <div className='my-24 mx-auto'>
                <img src={isLoading ? '/images/user-icon.png' : 
                !userInfo.profile ? '/images/user-icon.png' :
                userInfo.profile} 
                    alt="프로필 이미지" 
                    className="w-24 h-24 mx-auto bg-gray-300 rounded-full object-cover"
                />
                {isLoading ? <div className='mx-auto'>Loading...</div> : 
                (
                    <>
                    <p className='mt-4 font-semibold'>{userInfo.userName}</p>
                    <p className='mt-2'>{userInfo.userEmail}</p>
                    </>
                )}
                <div className='mt-6'>
                {menus.map((menu)=>(
                    <button onClick={()=>navigate(`/${menu.link}`)}  className='w-9/12 btn btn-outline mt-5 disabled:bg-gray-300 disabled:outline-none' key={menu.id}
                    disabled={userInfo.socialType==='google' ? true : false}
                    >
                        {menu.name}
                    </button>
                ))}
                <label htmlFor='confirm-modal' className='w-9/12 btn btn-outline mt-5'>로그아웃</label>
                </div>
            </div>
        </Content>
        </>
    )
}

export default UserProfile;