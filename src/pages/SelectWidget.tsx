import styled from "styled-components";
import { ErrorModal } from "../components/Modal/ErrorModal";
import { api } from "../atom/signin";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { moduleState } from "../atom/users";
import Complete from "../components/Modal/Complete";

const Content = styled.div`
    width: 448px;
    min-height: 100vh;
    margin: 0 auto;
    color: black;
`;

const List = styled.div`
    width: calc(50% - 4px);
`;

const SelectWidget = (): JSX.Element => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [checkboxes, setCheckboxes] = useRecoilState(moduleState);

    const handleCheckboxChange = (checked: boolean, id: string) => {
        setCheckboxes((prevState) => ({
        ...prevState,
        [id]: checked,
        }));
    };

    
    const isDisabled =
        Object.values(checkboxes).filter((checked) => checked).length < 2;

    const submitModule = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const checkedIds = Object.entries(checkboxes)
        .filter(([_, checked]) => checked)
        .map(([id]) => id);
        const userId = localStorage.getItem("userId");
        try{
            await api.post("/user/saveModule", {
                userId: userId,
                ...Object.fromEntries(checkedIds.map((id) => [id, true])),
            });
        } catch (error:any){
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <Content className="relative bg-stone-50">
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
                <p className="mt-8 text-lg">
                    사용하실 위젯을 선택해주세요.
                    <br />
                    (최소 2개 이상)
                </p>
                </div>
                <form action="" className="w-80 mx-auto mt-10" onSubmit={submitModule}>
                <div className="flex flex-wrap gap-2">
                    
                    {Object.entries(checkboxes).map(([id, checked]) => (
                    <List
                        className="h-10 p-2 flex text-left bg-stone-200 rounded-md"
                        key={id}
                    >
                        <input
                        type="checkbox"
                        id={id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleCheckboxChange(e.currentTarget.checked, id)
                        }
                        checked={checked}
                        />
                        <label
                        htmlFor={id}
                        className="inline-block w-full ml-2 cursor-pointer"
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
                    disabled={isDisabled}
                    className="w-80 mt-10 btn btn-primary"
                    type="submit"
                >
                    <label className="w-full p-3 cursor-pointer" htmlFor="complete-modal">
                    가입하기
                    </label>
                </button>
                </form>
            </div>
            </Content>
            <Complete />
            {error && (
                <ErrorModal title="Error" message={error} onClose={() => setError(null)} />
            )}
        </>
    );
};

export default SelectWidget;
