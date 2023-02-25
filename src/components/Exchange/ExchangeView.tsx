import { BiChevronRight } from "react-icons/bi";
import { useSliders } from "../../hooks/useSliders";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { ExchangeLike, getExchangeMain } from "../../atom/exchange";
import styled from "styled-components";
import DeleteModule from "../Buttons/DeleteModule";

const LongWidth = styled.div`
    position: relative;
    display:flex;
    left:0;
`

const DotPosition = styled.div`
    left: 50%;
    transform: translate(-50%, -50%);
`

const ExchangeView = ():JSX.Element => {
    const exchangeList = useRecoilValueLoadable(getExchangeMain);
    let likedList='hasValue' === exchangeList.state ? exchangeList.contents : [];
    // let likeList = useRecoilValue(ExchangeLike);
    // let liked = exchangeList.filter((item: any) => likeList.includes(item.currencyName));

    const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();

    const dots = [
        {id:1, class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors", move:NextSlide},
        {id:2, class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors", move:PrevSlide}
    ]

    //currencyName에 Y/N로 저장되도록 해둔거 같은데 Y인 currencyName인걸 가져오면 되는..구조인가?

    return (
        <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
            <DeleteModule />
            <div className="self-start flex items-center">
                환율 
                <Link to={`/exchange`} ><BiChevronRight size={26}/></Link>
            </div>
            {exchangeList.state === 'loading' ? 
            (<div className="pt-1" ref={slideRef} style={{width:'400px'}}>
                <p className="py-5">아직 아무것도 설정하지 않으셨어요!</p>
                <Link to={`/exchange`} className="btn btn-primary">
                    환율 상세보기
                </Link>
            </div>)
            : 
            (<LongWidth className="flex relative gap-3 overflow-hidden cursor-pointer" style={{width:`${2 < likedList.length ? '200%':'400px'}`}} ref={slideRef}>
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
            </LongWidth>)
            }
            
            <DotPosition className={`absolute flex bottom-0 z-50 ${3 > likedList.length ? 'hidden':''}`}>
                {dots.map((dot)=>(<button type="button" className={dot.class} key={dot.id} onClick={dot.move} ref={elem => (dotRef.current[dot.id-1] = elem)}></button>))}
            </DotPosition>
        </div>
    )
}

export default ExchangeView;