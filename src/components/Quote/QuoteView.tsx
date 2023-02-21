import styled from "styled-components";
import { GrRotateRight } from "react-icons/gr";
import { useSliders } from "../../hooks/useSliders";
import DeleteModule from "../Buttons/DeleteModule";
import { useRecoilValueLoadable } from "recoil";
import { useState } from "react";
import Loading from "./Loading";
import { quotesList, QuoteType } from "../../atom/quote";
import DisplayMyQuote from "./DisplayMyQuote";

const LongWidth = styled.div`
    width: 200%;
    position: relative;
    display:flex;
    left:0;
`

const QuoteView = () => {
    const listsLoadable = useRecoilValueLoadable(quotesList);
    let lists: QuoteType[] = 'hasValue' === listsLoadable.state ? listsLoadable.contents : [];

    const getRandom = Math.floor(Math.random() * lists.length)
    const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();
    const [number, setNumber] = useState(Math.floor(Math.random() * lists.length));
    
    const dots = [
        {id:1, class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors", move:NextSlide},
        {id:2, class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors", move:PrevSlide}
    ]
    
    return (
        <div className="w-full h-40 mt-5 p-3 relative flex flex-wrap justify-between items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
            <DeleteModule />
            <div className="absolute flex top-3 left-2 z-50">
                {dots.map((dot)=>(<button type="button" className={dot.class} key={dot.id} onClick={dot.move} ref={elem => (dotRef.current[dot.id-1] = elem)}></button>))}
            </div>
            <LongWidth ref={slideRef}>
                {listsLoadable.state === "loading" || listsLoadable.state === "hasError" ? 
                <Loading/> :
                <div className="w-96 h-28 relative flex flex-col items-center justify-center pl-6 select-none">
                    <p className="max-w-xs mx-auto line-clamp-3">
                    {lists[number].content}
                    </p>
                    <p className="mt-2 text-gray-500">
                        -{lists[number].writer}
                    </p>
                    <button className="absolute -right-1 bottom-0" onClick={() => setNumber(getRandom)}>
                        <GrRotateRight size={20} color="#999"/>
                    </button>
                </div>
                }
                <DisplayMyQuote/>
            </LongWidth>
        </div>
    )
}

export default QuoteView;