import styled from "styled-components";
import { api } from "../atom/signin";
import { VscLoading } from 'react-icons/vsc';
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { getModule, ModuleData } from "../atom/users";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { moduleState } from "../atom/users";
import { ErrorModal } from "../components/Modal/ErrorModal";

const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
`;

const List = styled.div`
    width: calc(50% - 4px);
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

const UpdateWidget = (): JSX.Element => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data, isFetching } = useQuery<ModuleData>(['modules'], getModule, {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
    const [checkboxes, setCheckboxes] = useRecoilState(moduleState);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState('업데이트');

    useEffect(()=>{
        if (data){
            setCheckboxes(data)
        }
    },[data])

    const handleCheckboxChange = (checked: boolean, id: string) => {
        setCheckboxes((prevState) => ({
        ...prevState,
        [id]: checked,
        }));
    };

    const moduleMutation = useMutation((moduleData:any) =>
        api.post(`/user/updateModule`, moduleData)
    );

    // 2개 이상 checked되어야 버튼 클릭할 수 있음
    const isDisabled =
        Object.values(checkboxes).filter((checked) => checked).length < 2;

    const submitModule = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const checkedIds = Object.entries(checkboxes)
        .filter(([_, checked]) => checked)
        .map(([id]) => id);
        try {
            setLoad('업데이트 중...')
            const response = await moduleMutation.mutateAsync({
                ...Object.fromEntries(checkedIds.map((id) => [id, true])),
            });
            setCheckboxes(response.data);
            queryClient.invalidateQueries(['modules']);
            setLoad('업데이트 완료!')
            alert('성공적으로 저장되었습니다!')
            navigate('/');
            location.reload();
        } catch (error:any){
            setLoad('업데이트')
            setError(error.response.data.message);
        }
    };

    return (
        <>
        <Content className="max-w-md relative bg-stone-50 dark:bg-neutral">
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
                <p className="mt-8 text-lg text-center dark:text-slate-100">
                    사용하실 위젯을 업데이트 해주세요.
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
                <Save
                    disabled={isDisabled || load === '업데이트 중...'}
                    className={`w-80 mt-10 btn ${load ==='업데이트 완료!' ? 'btn-secondary' : 'btn-primary'} disabled:bg-slate-300 disabled:bg-opacity-50 disabled:text-slate-400 text-base`}
                    type="submit"
                >
                    {load === '업데이트 중...' && <VscLoading className="load"/>}
                    {load === '업데이트 완료!' && <IoIosCheckmarkCircleOutline className='ok' size={20}/>}
                    {load}
                </Save>
            </form>
        </div>
        </Content>
        {error && (
        <ErrorModal message={error} onClose={() => setError(null)} />
        )}
        </>
    );
};

export default UpdateWidget;