import { BiChevronRight } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import DeleteModule from "../Buttons/DeleteModule";

const TrafficView = ():JSX.Element => {
    return (
        <div className="w-full h-fit relative mt-5 p-3 pt-2 border border-slate-300 rounded-lg bg-white">
            <DeleteModule />
            <div className="flex items-center">
                출근 정보
                <Link to={`/traffic`} ><BiChevronRight size={26}/> </Link>
            </div>
            <div className="w-full h-fit mt-2 p-3 border border-slate-300 rounded-lg bg-white">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                    <FiMapPin size={15}/>
                    출발 
                    <BiChevronRight size={22} style={{marginTop:'1px'}}/> 
                    도착
                    </div>
                <p className="mt-2 text-base">
                    지금 출발하시면 도착지까지 <br/> 
                    <span className="text-xl font-semibold">{`1시간 34분`}</span> 걸립니다. 
                </p>
                <p className="mt-2 mb-1 text-base">
                    도착 예정 시간은 
                    <span className="text-xl font-semibold">{` 10시 36분 `}</span>
                    입니다.
                </p>
            </div>
        </div>
    )
}

export default TrafficView;