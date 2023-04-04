import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BiSortAlt2 } from "react-icons/bi";
import { api } from "../../atom/signin";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { getDur, startingState, destinationState } from "../../atom/traffic";
import MapContainer from "./Map";
import DetailTopBar from "../MenuBars/DetailTopBar";
import { ErrorModal } from "../Modal/ErrorModal";
import SuccessModal from "../Modal/SuccessModal";
import PostCode from "./PostCode";

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
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [popup, setPopup] = useState(false);
    const [otherPopup, setOtherPopup] = useState(false);
    const [text, setText] = useState('길 찾기')

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

    const handleInput = (setState: React.Dispatch<React.SetStateAction<any>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState: any) => ({ ...prevState, [name]: value }));
    };

    const handleComplete = (setPopup: React.Dispatch<React.SetStateAction<boolean>>) => () => setPopup(prevState => !prevState);

    const handleOtherInput = handleInput(setDepart);
    const handleAddressInput = handleInput(setArrive);

    const handleOtherComplete = handleComplete(setOtherPopup);
    const handleAddressComplete = handleComplete(setPopup);

    // 도착지 정보 put(업데이트),post(처음에 저장)/delete(삭제)
    const postMutation = useMutation((newData) => api.post(`/traffic`, newData));
    const putMutation = useMutation((newData) => api.put(`/traffic`, newData));
    const deleteMutation = useMutation(() => api.delete(`/traffic`));

    const deleteText = async () => {
        try {
            await deleteMutation.mutateAsync();
            setDepart({address:''})
            setArrive({address:''})
            queryClient.invalidateQueries(['userPosition']);
            setSuccess('삭제되었습니다.')
        } catch (error:any) {
            setError(error.response.data.message);
        }
    }

    const submitData= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const newData:any = { destination: arrive.address, startingPoint: depart.address };
        setText('탐색 중...');
        try {
            if (!data){
                await postMutation.mutateAsync(newData);
                queryClient.invalidateQueries(['userPosition']);
                setSuccess('저장되었습니다.')
            } else {
                await putMutation.mutateAsync(newData);
                queryClient.invalidateQueries(['userPosition']);
                setSuccess('업데이트 되었습니다.')
            }
            setDepart((prevState:any) => ({ ...prevState, address: newData.startingPoint }));
            setArrive((prevState:any) => ({ ...prevState, address: newData.destination }));
            setText('길 찾기');
        } catch (error:any) {
            setError(error.response.data.message);
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
                            <label className="text-zinc-700">출발</label>
                            <Location type="search"
                            value={depart.address}
                            onChange={handleAddressInput} 
                            onClick={handleAddressComplete}
                            className="w-3/4 p-1 text-left" placeholder="출발지를 정해주세요."/>
                        </div>
                        <div className="p-2 px-3 flex items-center gap-3">
                            <label className="text-zinc-700">도착</label>
                            <Location type="search" 
                            value={arrive.address} 
                            onChange={handleOtherInput}
                            onClick={handleOtherComplete}
                            className="w-3/4 p-1 text-left" placeholder="도착지를 정해주세요."/>
                        </div>
                    </div>
                    <div className="flex mt-6 justify-between">
                        <input type="reset" className="w-2/5 btn btn-outline" value={'내용 삭제'} onClick={deleteText}/>
                        <input type="submit" 
                        className="w-2/5 btn btn-primary transition-all" 
                        value={text} 
                        disabled={!depart || !arrive || text === '탐색 중...' ? true:false}/>
                    </div>
                </form>
                <div className="w-full h-96 mt-8 mb-2 border border-slate-300 rounded-lg bg-stone-200 overflow-hidden">
                    <MapContainer />
                </div>
            </div>
        </Content>
        {error && (
            <ErrorModal message={error} onClose={() => setError(null)} />
        )}
        {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
        )}
        {popup && 
        <PostCode search={depart} setsearch={setDepart} closed={handleAddressComplete}/>}
        {otherPopup && 
        <PostCode search={arrive} setsearch={setArrive} closed={handleOtherComplete}/>}
        </>
    )
}

export default TrafficDetail;