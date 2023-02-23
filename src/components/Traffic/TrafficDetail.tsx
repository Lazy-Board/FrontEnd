import styled from "styled-components";
import { useRecoilState } from "recoil";
import { BiSortAlt2 } from "react-icons/bi";
import { startingState, destinationState } from "../../atom/traffic";
import axios from "axios";
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
    // 엔터 치면 관련 위치들 보여주는 식으로?
    // 지도 관련해서 일단..로그인이나 다른 거 구현 진행되면 다시 물어보자...
    // 지도를 어떻게 표시할지가 문제다
    const [depart, setDepart] = useRecoilState(startingState);
    const [arrive, setArrive] = useRecoilState(destinationState);

    const switchValue = (e:React.FormEvent) => {
        // 이 방식 말고 안되나??좋은 방법은 아닌거 같아서 신경쓰임 근데 뭐라고 검색해야 좋을지 모르겠음
        e.preventDefault();
        setDepart(arrive)
        setArrive(depart)
    }

    const deleteText = (e:React.FormEvent) => {
        e.preventDefault();
        setDepart('')
        setArrive('')
    }

    const patchData = async() =>{
        try{
            await axios.patch("http://localhost:5175/traffic", { startingPoint:depart, destination:arrive })
        } catch (error){
            console.log(`Error: \n${error}`);
        }
    }

    const submitData=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        patchData();
    }

    return (
        <>
        <DetailTopBar title="출근 정보"/>
        <Content className="max-w-md pb-24 bg-stone-100 p-3">
            <div className="w-full h-fit mt-16 p-3 border border-slate-300 rounded-lg bg-white">
                <p className="mb-2 text-left text-sm">예상 이동 시간</p>
                <p className="text-3xl font-semibold text-left">
                    {`1시간 34분`}
                </p>
                <p className="mt-4 text-left text-sm text-gray-400">* 정확한 주소를 입력해주세요!</p>
                <form action="#" className="w-full mt-4" onSubmit={submitData}>
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
                    <div className="flex mt-6 justify-between">
                        <input type="reset" className="w-2/5 btn btn-outline" value={'내용 삭제'} onClick={deleteText}/>
                        <input type="submit" className="w-2/5 btn btn-primary" value={'길 찾기'} disabled={!depart || !arrive ? true:false}/>
                    </div>
                </form>
                <div className="w-full h-80 mt-8 mb-2 border border-slate-300 rounded-lg bg-stone-200 overflow-hidden">
                </div>
            </div>
        </Content>
        </>
    )
}

export default TrafficDetail;