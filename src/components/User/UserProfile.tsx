import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserInfo } from "../../atom/users";
import { useNavigate } from "react-router-dom";
import DetailTopBar from "../MenuBars/DetailTopBar";
import MainLoading from "../MenuBars/MainLoading";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const UserProfile = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: userInfo, isLoading } = useQuery(["userInfo"], getUserInfo, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <>
      <DetailTopBar title={"계정 관리"} />
      <Content className={`max-w-md bg-stone-100 dark:bg-neutral dark:text-slate-200 ${isLoading ? 'pt-28' : 'flex items-center content-center'}`}>
        {isLoading ? <MainLoading /> : (
          <div className="my-24 mx-auto">
            <img src={!userInfo.profile ? '/images/user-icon.png' :
            userInfo.profile} 
                alt="프로필 이미지" 
                className="w-24 h-24 mx-auto bg-gray-300 rounded-full object-cover"
            />
            <p className="mt-4 font-semibold text-center">{userInfo.userName}</p>
            <p className="mt-2 text-center">{userInfo.userEmail}</p>
            <div className='w-72 mt-6 flex flex-col'>
              <Link to={'/user/userInfo'}
              className='w-full btn btn-outline mt-5'
              >
                  프로필 수정
              </Link>
              <button 
              className='w-full btn btn-outline mt-5'
              onClick={()=>navigate(`/user/update-password`)}
              disabled={userInfo.socialType==='google' ? true : false}
              >
                  비밀번호 변경
              </button>
              <label htmlFor='confirm-modal' className='w-full btn btn-outline mt-5'>로그아웃</label>
              <Link to={'/user/withdrawal'}
              className='w-full btn btn-outline mt-5'
              >
                  회원탈퇴
              </Link>
              </div>
          </div>
        )}
      </Content>
    </>
  );
};

export default UserProfile;
