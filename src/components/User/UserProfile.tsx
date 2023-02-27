import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DetailTopBar from '../MenuBars/DetailTopBar';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;

const UserProfile = ():JSX.Element => {
    const menus = [
        {id:1,name:'프로필 수정', link:'user/userInfo'},
        {id:2,name:'비밀번호 변경', link:'user/update-password'},
        {id:3,name:'회원 탈퇴', link:'user/withdrawal'},
    ]

    const quits = [
        {id:4,name:'로그아웃',modal:'confirm-modal'},
    ]
    
    return(
        <>
        <DetailTopBar title={'계정 관리'}/>
        <Content className="max-w-md bg-stone-100 flex items-center content-center">
            <div className='my-24 mx-auto'>
                <img src='/images/user-icon.png' 
                    alt="프로필 이미지" 
                    className="w-24 h-24 mx-auto bg-gray-300 rounded-full"
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