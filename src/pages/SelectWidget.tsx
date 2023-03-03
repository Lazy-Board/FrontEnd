import styled from "styled-components";
// import { api } from "../atom/signin";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const Content = styled.div`
    width:448px;
    min-height: 100vh;
    margin: 0 auto;
    color: black;
`;

const List = styled.div`
    width:calc(50% - 4px);
`

const list = [
    {id:'weather',name:'날씨'},
    {id:'todo',name:'투두리스트'},
    {id:'youtube',name:'유튜브'},
    {id:'stock',name:'주식'},
    {id:'exchange',name:'환율'},
    {id:'traffic',name:'출근정보'},
    {id:'quote',name:'오늘의 명언'},
    {id:'news',name:'뉴스'},
]

const SelectWidget = ():JSX.Element => {
    const navigate = useNavigate()
    const [checkboxes, setCheckboxes] = useState<any>([]);
    const handleCheckboxChange = (checked:boolean,id:string) => {
        if (checked) {
            setCheckboxes([...checkboxes, id]);
        } else {
            setCheckboxes(checkboxes.filter((el:any) => el !== id));
        }
    };
    // api.post('/user/saveModule',{userId:"", userModuleList:""})
    // api.post('/user/updateModule',{userModuleList:""})

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
        <Content className="relative bg-stone-50">
            <button className="absolute top-5 left-4" 
            onClick={()=>navigate(-1)}>
                <BsArrowLeftCircleFill size={30} color={'#00a7e9'}/>
            </button>
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
                <form action=""
                className="w-80 mx-auto mt-10">
                    <div className="flex flex-wrap gap-2">
                        {/* 위젯 리스트 작성하기.. */}
                        {list.map((item)=>(
                            <List className="h-10 p-2 flex text-left bg-stone-200 rounded-md" key={item.id}>
                                <input type="checkbox" 
                                id={item.id}
                                onChange={(e:any) => handleCheckboxChange(e.currentTarget.checked, item.id)}
                                checked={checkboxes.includes(item.id) ? true : false}
                                />
                                <label htmlFor={item.id} className="inline-block w-full ml-2 cursor-pointer">{item.name}</label>
                            </List>
                        ))}
                    </div>
                    <button disabled={isDisabled} 
                    className="w-80 mt-10 btn btn-primary" type="submit">
                        가입하기
                    </button>
                </form>
                
            </div>
        </Content>
    )
}

export default SelectWidget;