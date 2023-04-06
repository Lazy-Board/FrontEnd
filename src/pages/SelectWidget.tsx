import styled from "styled-components";
import { api } from "../atom/signin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { moduleState } from "../atom/users";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { VscLoading } from 'react-icons/vsc';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const Content = styled.div`
  width: 448px;
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const List = styled.div`
  width: calc(50% - 4px);
`;

const Save = styled.label`
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
  .ok {
    margin-right:8px;
  }
`

const SelectWidget = (): JSX.Element => {
  const navigate = useNavigate();
  const [load, setLoad] = useState('시작하기');
  const [checkboxes, setCheckboxes] = useRecoilState(moduleState);
  const handleCheckboxChange = (checked: boolean, id: string) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // 2개 이상 checked되어야 버튼 클릭할 수 있음
  const isDisabled =
    Object.values(checkboxes).filter((checked) => checked).length < 2;

  const submitModule = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const checkedIds = Object.entries(checkboxes)
      .filter(([_, checked]) => checked)
      .map(([id]) => id);
      setLoad('위젯 저장 중...')
      await api.post("/user/saveModule", {
        ...Object.fromEntries(checkedIds.map((id) => [id, true])),
      });
      setLoad('위젯 설정 완료!')
      navigate('/');
      location.reload();
  };

  return (
    <Content className="relative bg-stone-50 dark:bg-neutral">
      <button className="absolute top-5 left-4" onClick={() => navigate(-1)}>
        <BsArrowLeftCircleFill size={30} color={"#00a7e9"} />
      </button>
      <div className="py-48">
        <div>
          <img
            src="/images/menu.png"
            alt="위젯"
            className="h-24 w-24 mx-auto object-contain"
          />
          <p className="mt-8 text-lg text-center">
            사용하실 위젯을 선택해주세요.
            <br />
            (최소 2개 이상)
          </p>
        </div>
        <form action="" className="w-80 mx-auto mt-10" onSubmit={submitModule}>
          <div className="flex flex-wrap gap-2">
            {/* 위젯 리스트 체크*/}
            {Object.entries(checkboxes).map(([id, checked]) => (
              <List
                className={`h-10 flex rounded-md ${checked ? 'bg-sky-500 dark:bg-blue-600 text-white font-semibold p-2':'bg-stone-50 border-2 border-slate-400 dark:bg-neutral dark:border-slate-600 text-slate-500 dark:text-slate-300 pt-1.5'} transition-colors`}
                key={id}
              >
                <input
                  type="checkbox"
                  id={id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCheckboxChange(e.currentTarget.checked, id)
                  }
                  className="hidden"
                  checked={checked}
                />
                <label
                  htmlFor={id}
                  className="inline-block w-full text-center cursor-pointer"
                >
                  {id.includes("exchange")
                    ? "환율"
                    : id.includes("weather")
                    ? "날씨"
                    : id.includes("youtube")
                    ? "유튜브"
                    : id.includes("todo")
                    ? "투두리스트"
                    : id.includes("news")
                    ? "뉴스"
                    : id.includes("quote")
                    ? "오늘의 명언"
                    : id.includes("stock")
                    ? "주식"
                    : "출근정보"}
                </label>
              </List>
            ))}
          </div>
          <button
            disabled={isDisabled || load === '위젯 저장 중...'}
            className={`w-80 mt-10 btn ${load ==='위젯 설정 완료!' ? 'btn-secondary' : 'btn-primary'} disabled:bg-slate-300 disabled:bg-opacity-50 disabled:text-slate-400`}
            type="submit"
          >
            <Save className="w-full p-3 cursor-pointer" >
                {load === '위젯 저장 중...' && <VscLoading className="load"/>}
                {load === '위젯 설정 완료!' && <IoIosCheckmarkCircleOutline className='ok' size={20}/>}
                {load}
            </Save>
          </button>
        </form>
      </div>
    </Content>
  );
};

export default SelectWidget;
