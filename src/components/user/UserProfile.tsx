import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;
    // content 따로 분리해서 layout용으로 만들기
    // 아이콘은 react-icons 설치해서 사용하는 쪽이 편할 듯?(svg 쓰면 너무 길어지는 게 맘에 들지 않음..)

const UserProfile = ():JSX.Element => {
    const menus = [
        {id:1,name:'사용자 정보 수정', link:''},
        {id:2,name:'사용자 설정', link:''},
    ]

    const quits = [
        // 아래는 button으로 해서 confirm modal이 나오는 쪽이 나을 것 같음
        // (계정 탈퇴 누르면 '정말로 탈퇴하시겠습니까?' 하는 창이 뜨는 식으로)
        {id:3,name:'로그아웃'},
        {id:4,name:'계정 탈퇴'},
    ]
    return(
        <Content className="max-w-md bg-stone-100">
            <div className='py-48'>
                <img src="https://icons-for-free.com/download-icon-business+human+person+profile+seo+user+icon-1320186746402784223_512.png" 
                    alt="프로필 이미지" 
                    className="w-24 mx-auto"
                />
                <p className='mt-4 font-semibold'>{`이름이름이름`}</p>
                <p className='mt-2'>{`example@email.com`}</p>
                <div className='mt-6'>
                {menus.map((menu)=>(
                    <Link to={`/${menu.link}`} className='w-9/12 btn btn-outline mt-5' key={menu.id}>{menu.name}</Link>
                ))}
                {quits.map((item)=>(
                    <button className='w-9/12 btn btn-outline mt-5' key={item.id}>{item.name}</button>
                ))}
                </div>
            </div>
        </Content>
    )
}

export default UserProfile;