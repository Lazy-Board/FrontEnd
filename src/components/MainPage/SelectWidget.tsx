import styled from "styled-components";
import { useState, useEffect } from "react";

const Content = styled.div`
    width:448px;
    min-height: 100vh;
    margin: 0 auto;
    color: black;
    background-color:white;
`;

const list = [
    {id:'WeatherWidget',name:'날씨'},
    {id:'TodoWidget',name:'투두리스트'},
    {id:'YouTubeWidget',name:'유튜브'},
    {id:'StockWidget',name:'주식'},
    {id:'ExchangeWidget',name:'환율'},
    {id:'TrafficWidget',name:'출근정보'},
    {id:'QuoteWidget',name:'오늘의 명언'},
    {id:'NewsWidget',name:'뉴스'},
]

const SelectWidget = ():JSX.Element => {
    const [checkboxes, setCheckboxes] = useState<any>([]);
    const handleCheckboxChange = (checked:boolean,id:string) => {
        if (checked) {
            setCheckboxes([...checkboxes, id]);
        } else {
            setCheckboxes(checkboxes.filter((el:any) => el !== id));
        }
    };

    // 2개 이상 checked되어야 버튼 클릭할 수 있음
    const isDisabled = checkboxes.filter((checked:boolean) => checked).length < 2;

    useEffect(() => {
        const storedCheckboxes = JSON.parse(localStorage.getItem('checkboxes') as string) || [];
        setCheckboxes(storedCheckboxes);
    }, []);
    
    useEffect(() => {
        localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }, [checkboxes]);

    return (
        <Content>
            <div className="py-48">
                <div>
                    <img src="/images/menu.png" alt="위젯" 
                    className="h-24 w-24 mx-auto object-contain"/>
                    <p className="mt-8 text-lg">
                        사용하실 위젯을 선택해주세요.
                        <br/>
                        (최소 2개 이상)
                    </p>
                </div>
                <div className="w-80 pl-3 mx-auto mt-10 flex flex-wrap gap-2">
                    {/* 위젯 리스트 작성하기.. */}
                    {list.map((item)=>(
                        <div className="w-36 h-10 p-2 flex text-left bg-zinc-200 rounded-md" key={item.id}>
                            <input type="checkbox" 
                            id={item.id}
                            onChange={(e:any) => handleCheckboxChange(e.currentTarget.checked, item.id)}
                            checked={checkboxes.includes(item.id) ? true : false}
                            />
                            <label htmlFor={item.id} className="inline-block w-full ml-2 cursor-pointer">{item.name}</label>
                        </div>
                    ))}
                </div>
                <button disabled={isDisabled} className="w-80 mt-10 btn btn-primary">가입하기</button>
            </div>
        </Content>
    )
}

export default SelectWidget;