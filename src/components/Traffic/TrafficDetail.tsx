import styled from "styled-components";
import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import DetailTopBar from "../MenuBars/DetailTopBar";

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;

const Location = styled.input`
    transition: all 0.2s;
    &:focus{
        outline:none;
        border-radius:5px;
        background-color: #eee;
    }
`;

const TrafficDetail = () => {
    // 위치 설정..검색 방식이면 검색창 구현해야 함
    // 그리고 검색 결과 보여줄 화면도 구현해야 함
    const [depart, setDepart] = useState('');
    const [arrive, setArrive] = useState('');

    const switchValue = (e:any) => {
        e.preventDefault();
        setDepart(arrive)
        setArrive(depart)
    }

    const deleteText = (e:any) => {
        e.preventDefault();
        setDepart('')
        setArrive('')
    }

    return (
        <>
        <DetailTopBar title="출근 정보"/>
        <Content className="max-w-md pb-24 bg-stone-100 p-3">
            <div className="w-full h-fit mt-16 p-3 border border-slate-300 rounded-lg bg-white">
                <p className="mb-2 text-left text-sm">도착 예정 시간</p>
                <p className="text-3xl font-semibold text-left">1시간 34분</p>
                <form action="#" className="w-full mt-7">
                    <div className="w-full relative border border-slate-300 rounded-lg">
                        <button className="absolute p-1 top-8 right-3 rounded-full border border-slate-300 bg-white hover:bg-green-400 text-slate-600 hover:text-white transition-colors">
                            <BiSortAlt2 size={20} onClick={switchValue}/>
                        </button>
                        <div className="p-2 px-3 flex items-center gap-3 border-b border-slate-300">
                            <label htmlFor="">출발</label>
                            <Location type="search" value={depart} onChange={(e)=>setDepart(e.target.value)} className="w-3/4 p-1 text-left" placeholder="출발지를 정해주세요."/>
                        </div>
                        <div className="p-2 px-3 flex items-center gap-3">
                        <label htmlFor="">도착</label>
                            <Location type="search" value={arrive} onChange={(e)=>setArrive(e.target.value)} className="w-3/4 p-1 text-left" placeholder="도착지를 정해주세요."/>
                        </div>
                    </div>
                    <div className="flex mt-4 justify-between">
                        <input type="reset" className="w-2/5 btn btn-outline" value={'내용 삭제'} onClick={deleteText}/>
                        <input type="submit" className="w-2/5 btn btn-primary" value={'길 찾기'}/>
                    </div>
                </form>
                <div className="w-full h-80 mt-8 mb-2 border border-slate-300 rounded-lg bg-stone-200">
                    여기에 지도가 들어가야 함(아마도) <br/>
                    따로 지도 컴포넌트를 만들어서 넣어야 함
                </div>
            </div>
        </Content>
        </>
    )
}

export default TrafficDetail;