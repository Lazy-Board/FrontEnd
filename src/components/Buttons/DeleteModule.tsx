import { BiX } from "react-icons/bi";

const DeleteModule = ():JSX.Element => {
    // 나중에 기능을 추가
    return (
        <button className="absolute top-2 right-2 z-40">
            <BiX className="text-slate-400" size={24}/>
        </button>
    )
}

export default DeleteModule;