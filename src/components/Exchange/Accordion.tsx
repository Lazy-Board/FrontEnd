import styled from "styled-components";
import { useRef, useState, useEffect } from 'react';
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
<<<<<<< HEAD
import LikeButton from "../Quote/LikeButton";
import ToggleButton from "../Quote/ToggleButton";
=======
import { useRecoilState } from "recoil";
import { ExchangeLike, AccordionProps } from "../../atom/exchange";
import LikeButton from "./LikeButton";
import ToggleButton from "./ToggleButton";
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
import AccordionContent from "./AccordionContent";

const Flag = styled.img`
    width:20px;
    height:20px;
    border-radius:100px;
    background-color: #999;
`;

<<<<<<< HEAD
interface AccordionProps {
    country:string
    currency:number
    status:string
    compare:number
    buy:number
    sell:number
    send:number
    receive:number
    classes:string
    isOpened:boolean
    handleOpening:Function
}

const Accordions = (props:AccordionProps):JSX.Element => {
    const {country, currency, status, compare, buy, sell, send, receive, classes, isOpened, handleOpening } = props;
    const [height, setHeight] = useState<string>("0px");
=======
const Accordions = (props:AccordionProps):JSX.Element => {
    const {countryName, currencyName, tradingStandardRate, comparedPreviousDay, fluctuationRate, classes, isOpened, handleOpening } = props;
    const [height, setHeight] = useState<string>("0px");
    const [wishlist, setWishlist] = useRecoilState<String[]>(ExchangeLike);
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
    const contentElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpened) {
<<<<<<< HEAD
            setHeight("150px");
=======
            setHeight("120px");
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
        } else {
            setHeight("0px");
        }
    }, [isOpened, contentElement]);

<<<<<<< HEAD
=======
    const handleWishlist = () => {
        const isInWishlist = wishlist.includes(currencyName);
    
        if (!isInWishlist) {
            setWishlist([...wishlist, currencyName]);
        } else {
            setWishlist(wishlist.filter((id) => id !== currencyName));
        }
    };

>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
    return (
        <div className={`w-full px-1 py-2 ${classes} border-slate-300`}>
            <div className="flex justify-between">
                <div className="flex items-center pl-1 gap-2">
<<<<<<< HEAD
                    <Flag src="" alt="" />
                    <p className="text-sm">{country}</p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-sm">{currency.toFixed(2)}</p>
                    <p className={`w-16 text-sm ${status === '-' ? 'text-blue-600': 'text-red-500'}`}>
                        {status === '-' ? <BiCaretDown className="inline-block"/> : <BiCaretUp className="inline-block"/>}
                        {status}{compare.toFixed(2)}%
                    </p>
                    <LikeButton />
=======
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
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
                    <ToggleButton state={isOpened} click={handleOpening}/>
                </div>
            </div>
            <AccordionContent 
                ref={contentElement}
                height={height}
<<<<<<< HEAD
                buy={buy}
                sell={sell}
                send={send}
                receive={receive}
=======
                {...props}
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
            />
        </div>
    )
}

export default Accordions;