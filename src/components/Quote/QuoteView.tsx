import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { GrRotateRight } from "react-icons/gr";
import { useSliders } from "../../hooks/useSliders";
import DeleteModule from "../Buttons/DeleteModule";

const LongWidth = styled.div`
        width: 200%;
        position: relative;
        display:flex;
        left:0;
    `

const QuoteView = () => {
    const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();

    const dots = [
        {id:1, class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors", move:NextSlide},
        {id:2, class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors", move:PrevSlide}
    ]
    
    return (
        <div className="w-full h-fit mt-5 p-3 relative flex flex-wrap justify-between items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
            <DeleteModule />
            <div className="absolute flex top-3 left-2 z-50">
                {dots.map((dot)=>(<button type="button" className={dot.class} key={dot.id} onClick={dot.move} ref={elem => (dotRef.current[dot.id-1] = elem)}></button>))}
            </div>
            <LongWidth ref={slideRef}>
                <div className="w-96 relative flex flex-col items-center justify-center pl-6 select-none cur">
                    <p className="max-w-xs mx-auto">단순하게 살아라. 현대인은 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?</p>
                    <p className="mt-2 text-gray-500">-이드리스 샤흐</p>
                    <button className="absolute -right-1 bottom-0">
                        <GrRotateRight size={20} color="#999"/>
                    </button>
                </div>
                <div className="w-96 relative flex items-center justify-center ml-6 select-none">
                    <p className="max-w-xs mx-auto">누구보다 집에 가고 싶다.</p>
                    <label htmlFor="edit-modal" className="absolute bottom-1 right-0 cursor-pointer">
                        <FiEdit2 size={18} color="#999"/>
                    </label>
                </div>
            </LongWidth>
        </div>
    )
}

export default QuoteView;