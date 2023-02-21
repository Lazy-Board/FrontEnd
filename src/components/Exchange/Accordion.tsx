import styled from "styled-components";
import { useRef, useState, useEffect } from 'react';
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { ExchangeLike, AccordionProps } from "../../atom/exchange";
import LikeButton from "./LikeButton";
import ToggleButton from "./ToggleButton";
import AccordionContent from "./AccordionContent";

const Flag = styled.img`
    width:20px;
    height:20px;
    border-radius:100px;
    background-color: #999;
`;

const Accordions = (props:AccordionProps):JSX.Element => {
    const {countryName, currencyName, tradingStandardRate, comparedPreviousDay, fluctuationRate, classes, isOpened, handleOpening } = props;
    const [height, setHeight] = useState<string>("0px");
    const [wishlist, setWishlist] = useRecoilState<String[]>(ExchangeLike);
    const contentElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpened) {
            setHeight("120px");
        } else {
            setHeight("0px");
        }
    }, [isOpened, contentElement]);

    const handleWishlist = () => {
        const isInWishlist = wishlist.includes(currencyName);
    
        if (!isInWishlist) {
            setWishlist([...wishlist, currencyName]);
        } else {
            setWishlist(wishlist.filter((id) => id !== currencyName));
        }
    };

    return (
        <div className={`w-full px-1 py-2 ${classes} border-slate-300`}>
            <div className="flex justify-between">
                <div className="flex items-center pl-1 gap-2">
                    <Flag src={`/currencyImage/${currencyName}.png`} alt={countryName} />
                    <p className="text-sm object-contain">
                        {countryName}&nbsp;{currencyName}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-sm">{tradingStandardRate}</p>
                    <p className={`w-16 text-sm ${comparedPreviousDay.includes('▼') ? 'text-blue-600': 'text-red-500'}`}>
                        {comparedPreviousDay.includes('▼') ? <BiCaretDown className="inline-block"/> : <BiCaretUp className="inline-block"/>}
                        {fluctuationRate}%
                    </p>
                    <button onClick={handleWishlist}>
                        <LikeButton />
                    </button>
                    <ToggleButton state={isOpened} click={handleOpening}/>
                </div>
            </div>
            <AccordionContent 
                ref={contentElement}
                height={height}
                {...props}
            />
        </div>
    )
}

export default Accordions;