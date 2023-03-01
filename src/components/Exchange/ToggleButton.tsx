import { BiChevronUp } from "react-icons/bi";

const ToggleButton = ({state, click}:any) => {
    return (
        <button>
            <BiChevronUp className={`transition-all ${!state ? '': 'rotate-180'}`} size={26} color="#666" onClick={click}/>
        </button>
    )
}

export default ToggleButton;
