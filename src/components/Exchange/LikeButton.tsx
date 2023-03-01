import { useState } from "react";
import { RiStarLine, RiStarFill } from "react-icons/ri";

const LikeButton = () => {
    const [like, setLike] = useState(false);

    const wishAddHandler = () => {
        setLike(!like);
    };

    return (
        <>
        <input type="checkbox" id="checked" className="hidden"/>
        <label onClick={wishAddHandler} className="transition-colors cursor-pointer" htmlFor="checked">
            {like ? <RiStarFill color="#f5c516" size={20}/> : <RiStarLine color="#999" size={20}/>}
        </label>
        </>
    )
}

export default LikeButton;