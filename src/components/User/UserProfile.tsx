import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DetailTopBar from '../MenuBars/DetailTopBar';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;
    // content 따로 분리해서 layout용으로 만들기

const UserProfile = ():JSX.Element => {
    const menus = [
        {id:1,name:'사용자 정보 수정', link:'user/userInfo'},
        {id:2,name:'사용자 설정', link:''},
    ]

    const quits = [
        {id:3,name:'로그아웃',modal:'confirm-modal'},
        {id:4,name:'계정 탈퇴',modal:'confirm-modal'},
    ]

    // isLoading 일 때 프로필 이미지, 닉네임, 이메일 부분 skeletonUI 처리
    
    return(
        <>
        <DetailTopBar title={'계정 관리'}/>
        <Content className="max-w-md bg-stone-100">
            <div className='py-48'>
                <img src="https://icons-for-free.com/download-icon-business+human+person+profile+seo+user+icon-1320186746402784223_512.png" 
                    alt="프로필 이미지" 
                    className="w-24 mx-auto"
                />
                <p className='mt-4 font-semibold'>{`김철수`}</p>
                <p className='mt-2'>{`example@email.com`}</p>
                <div className='mt-6'>
                {menus.map((menu)=>(
                    <Link to={`/${menu.link}`} className='w-9/12 btn btn-outline mt-5' key={menu.id}>{menu.name}</Link>
                ))}
                {quits.map((item)=>(
                    <label htmlFor={item.modal} className='w-9/12 btn btn-outline mt-5' key={item.id}>{item.name}</label>
                ))}
                </div>
            </div>
        </Content>
        </>
    )
}

export default UserProfile;