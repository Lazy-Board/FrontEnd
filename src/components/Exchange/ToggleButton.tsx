import { BiChevronUp } from "react-icons/bi";

const ToggleButton = (state:any) => {
    return (
        <button>
            <BiChevronUp className={`transition-all ${!state ? '': 'rotate-180'}`} size={26} color="#666"/>
        </button>
    )
}

export default ToggleButton;
