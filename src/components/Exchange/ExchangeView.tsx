import { BiChevronRight } from "react-icons/bi";
import { useSliders } from "../../hooks/useSliders";
import { Link } from "react-router-dom";
import { likedList } from "./list";
import { useRecoilValue } from "recoil";
import { ExchangeLike, getExchangeDetail } from "../../atom/exchange";
import styled from "styled-components";
import DeleteModule from "../Buttons/DeleteModule";

const LongWidth = styled.div`
        width: ${2 < likedList.length ? '200%':'400px'};
        position: relative;
        display:flex;
        left:0;
    `

const DotPosition = styled.div`
    left: 50%;
    transform: translate(-50%, -50%);
`

const ExchangeView = ():JSX.Element => {
    // const exchangeList = useRecoilValue(getExchangeDetail);
    // let likeList = useRecoilValue(ExchangeLike);
    // let liked = exchangeList.filter((item: any) => likeList.includes(item.currencyName));

    const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();

    const dots = [
        {id:1, class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors", move:NextSlide},
        {id:2, class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors", move:PrevSlide}
    ]

    //임시로 데이터 넣어줬는데 실제로 likedList를 어떻게 가져와야 하지..?
    //countryName,currencyName,tradingStandardRate,fluctuationRate,comparedPreviousDay을 저장하도록 하면 되나?

    return (
        <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
            <DeleteModule />
            <div className="self-start flex items-center">
                환율 
                <Link to={`/exchange`} ><BiChevronRight size={26}/></Link>
            </div>
            {0 < likedList.length ? (
                <LongWidth className="flex relative gap-3 overflow-hidden cursor-pointer" ref={slideRef}>
                {likedList.map((item:any)=>(
                    <div className="w-48 p-2 mt-2 text-left border border-slate-300 rounded-lg select-none" key={item.countryName}>
                        <p>
                            {`${item.countryName} 
                            ${item.currencyName} 
                            - KRW`}
                        </p>
                        <p className="text-2xl font-semibold">{item.tradingStandardRate}</p>
                        <div className={`flex mt-2 items-center ${item.comparedPreviousDay.includes('▼') ? 'text-blue-600' : 'text-red-500'}`}>
                            {`${item.comparedPreviousDay} 
                            (${item.fluctuationRate})`}
                        </div>
                    </div>
                ))}
            </LongWidth>
            ): (
                <div className="pt-1">
                    <p className="py-5">아직 아무것도 설정하지 않으셨어요!</p>
                    <Link to={`/exchange`} className="btn btn-primary">
                        환율 상세보기
                    </Link>
                </div>
            )}
            
            <DotPosition className={`absolute flex bottom-0 z-50 ${3 > likedList.length ? 'hidden':''}`}>
                {dots.map((dot)=>(<button type="button" className={dot.class} key={dot.id} onClick={dot.move} ref={elem => (dotRef.current[dot.id-1] = elem)}></button>))}
            </DotPosition>
        </div>
    )
}

export default ExchangeView;