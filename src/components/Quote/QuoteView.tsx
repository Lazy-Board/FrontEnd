import { useRecoilValueLoadable } from "recoil";
import { GrRotateRight } from "react-icons/gr";
import { useSliders } from "../../hooks/useSliders";
import { quotesList, QuoteType } from "../../atom/quote";
import DisplayMyQuote from "./DisplayMyQuote";
import DeleteModule from "../Buttons/DeleteModule";
import Loading from "./Loading";
import styled from "styled-components";

const LongWidth = styled.div`
    width: 200%;
    position: relative;
    display:flex;
    left:0;
`
// get할때마다 랜덤으로 뜨는 형식이라서 바꿔야 함
// 걍 넣지 말자...

const QuoteView = (): JSX.Element => {
    const quoteLoadable = useRecoilValueLoadable(quotesList);
    let lists:QuoteType = 'hasValue' === quoteLoadable.state ? quoteLoadable.contents : {content:'',writer:''}

    const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();
    
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
                {quoteLoadable.state === 'loading' ? 
                <Loading/> :
                <div className="w-96 h-28 relative flex flex-col items-center justify-center pl-6 select-none">
                    <p className="max-w-xs mx-auto line-clamp-3">
                    {lists.content}
                    </p>
                    <p className="mt-2 text-gray-500">
                        -{lists.writer}
                    </p>
                    {/* <button className="absolute -right-1 bottom-0" >
                        <GrRotateRight size={20} className="text-gray-400 hover:text-green-500 transition-colors"/>
                    </button> */}
                </div>
                }
                <DisplayMyQuote/>
            </LongWidth>
        </div>
    )
}

export default QuoteView;