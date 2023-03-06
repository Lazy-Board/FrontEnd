import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { BiSortAlt2 } from "react-icons/bi";
import { api } from "../../atom/signin";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { getDur, startingState, destinationState } from "../../atom/traffic";
import MapContainer from "./Map";
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
    const queryClient = useQueryClient();
    const { data } = useQuery(['userPosition'], getDur, {
        refetchOnWindowFocus:false,
        staleTime:Infinity,
    });

    const [depart, setDepart] = useRecoilState(startingState);
    const [arrive, setArrive] = useRecoilState(destinationState);

    useEffect(()=>{
        if (data){
            setDepart(data.startingPoint)
            setArrive(data.destination)
        }
    },[data])

    const switchValue = (e:React.FormEvent) => {
        e.preventDefault();
        setDepart(arrive)
        setArrive(depart)
    }

    // 도착지 정보 put(업데이트),post(처음에 저장)/delete(삭제)
    const postMutation = useMutation((newData) => api.post(`/traffic`, newData));
    const putMutation = useMutation((newData) => api.put(`/traffic`, newData));
    const deleteMutation = useMutation(() => api.delete(`/traffic`));

    const deleteText = async () => {
        try {
            await deleteMutation.mutateAsync();
            setDepart('')
            setArrive('')
            queryClient.invalidateQueries(['userPosition']);
            alert('삭제되었습니다.')
        } catch (error:any) {
            console.error(`Error: \n${error.response.data.message}`);
        }
    }

    const submitData= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const newData:any = { destination: arrive, startingPoint: depart };
        try {
            if (!data){
                await postMutation.mutateAsync(newData);
                queryClient.invalidateQueries(['userPosition']);
            } else {
                await putMutation.mutateAsync(newData);
                queryClient.invalidateQueries(['userPosition']);
            }
            setDepart(newData.startingPoint);
            setArrive(newData.destination);
        } catch (error:any) {
            alert(`Error: \n${error.response.data.message}`);
        }
    }

    return (
        <>
        <DetailTopBar title="출근 정보"/>
        <Content className="max-w-md pb-24 bg-stone-100 p-3">
            <div className="w-full h-fit mt-16 p-3 border border-slate-300 rounded-lg bg-white">
                <p className="mb-2 text-left text-sm">예상 이동 시간</p>
                <p className="text-3xl font-semibold text-left">
                    {!data ? '00시간 00분':
                    `
                    ${Number(data.duration)%3600 > 0 ? '':`${Math.floor(Number(data.duration)/3600)}시간 `}
                    ${`${Math.floor((Number(data.duration)% 3600)/60)}분`}`
                    }
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
                <div className="w-full h-96 mt-8 mb-2 border border-slate-300 rounded-lg bg-stone-200 overflow-hidden">
                    <MapContainer />
                </div>
            </div>
        </Content>
        </>
    )
}

export default TrafficDetail;