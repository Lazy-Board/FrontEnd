import styled from "styled-components";
import { useRef, useState, useEffect } from 'react';
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import LikeButton from "../Quote/LikeButton";
import ToggleButton from "../Quote/ToggleButton";
import AccordionContent from "./AccordionContent";

const Flag = styled.img`
    width:20px;
    height:20px;
    border-radius:100px;
    background-color: #999;
`;

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
    const contentElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpened) {
            setHeight("150px");
        } else {
            setHeight("0px");
        }
    }, [isOpened, contentElement]);

    return (
        <div className={`w-full px-1 py-2 ${classes} border-slate-300`}>
            <div className="flex justify-between">
                <div className="flex items-center pl-1 gap-2">
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
                    <ToggleButton state={isOpened} click={handleOpening}/>
                </div>
            </div>
            <AccordionContent 
                ref={contentElement}
                height={height}
                buy={buy}
                sell={sell}
                send={send}
                receive={receive}
            />
        </div>
    )
}

export default Accordions;