import { BiChevronRight } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { useRecoilValueLoadable } from "recoil";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getLocation, Duration, getDur } from "../../atom/traffic";
import TrafficLoading from "./TrafficLoading";
import DeleteModule from "../Buttons/DeleteModule";

const TrafficView = ():JSX.Element => {
    // const queryClient = useQueryClient();
    const { data:durationInfo, isLoading } = useQuery(['userPosition'], getDur, {
        refetchOnWindowFocus:false,
    });

    // const showDuration = useRecoilValueLoadable(getLocation);
    // let durationInfo:Duration = 
    // 'hasValue' === showDuration.state ? showDuration.contents : {startingPoint:'출발지점',destination:'도착지점',duration:'NaN'}


    const { startingPoint, destination, duration } = durationInfo || {};

    const now=new Date();
    const hour=now.getHours()*3600
    const minutes=now.getMinutes()*60;
    const seconds=now.getSeconds();
    const nowSec=hour+minutes+seconds;
    
    return (
        <div className="w-full h-fit relative mt-5 p-3 pt-2 border border-slate-300 rounded-lg bg-white">
            <DeleteModule />
            <div className="flex items-center">
                출근 정보
                <Link to={`/traffic`} ><BiChevronRight size={26}/> </Link>
            </div>
            {isLoading || !durationInfo ? <TrafficLoading />:
            !startingPoint ? 
            <div className="w-full h-36 mt-4 border border-slate-300 rounded-lg">
                <p className="mt-8">아직 위치를 설정하지 않으셨어요!</p>
                <Link to={`/traffic`} className="btn btn-primary mt-4">
                    설정하기
                </Link>
            </div>
            :
            <div className="w-full h-fit mt-2 p-3 border border-slate-300 rounded-lg bg-white">
            <div className="flex items-center justify-center gap-2 text-gray-500">
                <FiMapPin size={15}/>
                <p className="w-42 text-sm truncate">
                    {startingPoint}
                </p>
                <BiChevronRight size={24} /> 
                <p className="w-42 text-sm truncate">
                    {destination}
                </p>
            </div>
            <p className="mt-4 text-base">
                지금 출발하시면 도착지까지 <br/> 
                <span className="text-xl font-semibold">
                    {Number(duration)%3600 > 0 ? '':`${Math.floor(Number(duration)/3600)}시간`}
                    {`${Math.floor((Number(duration)% 3600)/60)}분`}</span> 걸립니다. 
            </p>
            <p className="mt-2 mb-1 text-base">
                도착 예정 시간은&nbsp;
                <span className="text-xl font-semibold">
                    {`${Math.floor((Number(nowSec)+Number(duration))/3600)}시`}
                    &nbsp;
                    {`${Math.floor(((Number(nowSec)+Number(duration))%3600)/60)}분`}
                </span>
                &nbsp;입니다.
            </p>
            </div>
            }
        </div>
    )
}

export default TrafficView;