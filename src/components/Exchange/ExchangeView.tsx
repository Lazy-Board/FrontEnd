<<<<<<< HEAD
import { BiCaretDown, BiChevronRight } from "react-icons/bi";
import { useSliders } from "../../hooks/useSliders";
import { Link } from "react-router-dom";
=======
import { BiChevronRight } from "react-icons/bi";
import { useSliders } from "../../hooks/useSliders";
import { Link } from "react-router-dom";
import { likedList } from "./list";
import { useRecoilValue } from "recoil";
import { ExchangeLike, getExchangeDetail } from "../../atom/exchange";
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
import styled from "styled-components";
import DeleteModule from "../Buttons/DeleteModule";

const LongWidth = styled.div`
<<<<<<< HEAD
        width: 200%;
=======
        width: ${2 < likedList.length ? '200%':'400px'};
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
        position: relative;
        display:flex;
        left:0;
    `

const DotPosition = styled.div`
    left: 50%;
    transform: translate(-50%, -50%);
`

const ExchangeView = ():JSX.Element => {
<<<<<<< HEAD
=======
    // const exchangeList = useRecoilValue(getExchangeDetail);
    // let likeList = useRecoilValue(ExchangeLike);
    // let liked = exchangeList.filter((item: any) => likeList.includes(item.currencyName));

>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
    const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();

    const dots = [
        {id:1, class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors", move:NextSlide},
        {id:2, class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors", move:PrevSlide}
    ]

<<<<<<< HEAD
    const list = [
        {country:'홍콩 HKD', currency: 156.84, status: '-', compare: 0.63, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
        {country:'태국 THB', currency: 37.40, status: '-', compare: 0.37, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
        {country:'호주 AUD', currency: 870.01, status: '+', compare: 0.08, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
        {country:'미국 USD', currency: 1259.00, status: '-', compare: 1.00, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
    ]

    //체크한 환율이 아무것도 없으면 '이런! 아직 아무것도 체크하지 않으셨어요!'
    //+ 인디케이터 안보이게
=======
    //임시로 데이터 넣어줬는데 실제로 likedList를 어떻게 가져와야 하지..?
    //countryName,currencyName,tradingStandardRate,fluctuationRate,comparedPreviousDay을 저장하도록 하면 되나?
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b

    return (
        <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
            <DeleteModule />
            <div className="self-start flex items-center">
                환율 
<<<<<<< HEAD
                <Link to={`/exchange`} ><BiChevronRight  size={26}/> </Link>
            </div>
            <LongWidth className="flex relative gap-3 overflow-hidden" ref={slideRef}>
                {list.map(item=>(
                    <div className="w-1/4 p-2 mt-2 text-left border border-slate-300 rounded-lg select-none" key={item.country}>
                        <p>{item.country} - KRW</p>
                        <p className="text-2xl font-semibold">{item.currency.toFixed(2)}</p>
                        <div className={`flex mt-2 items-center ${item.status==='-' ? 'text-blue-600' : 'text-red-500'}`}>
                            <BiCaretDown className="inline-block" size={20}/>
                            {item.status}
                            {item.compare.toFixed(2)}
=======
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
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
                        </div>
                    </div>
                ))}
            </LongWidth>
<<<<<<< HEAD
            <DotPosition className="absolute flex bottom-0 z-50">
=======
            ): (
                <div className="pt-1">
                    <p className="py-5">아직 아무것도 설정하지 않으셨어요!</p>
                    <Link to={`/exchange`} className="btn btn-primary">
                        환율 상세보기
                    </Link>
                </div>
            )}
            
            <DotPosition className={`absolute flex bottom-0 z-50 ${3 > likedList.length ? 'hidden':''}`}>
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
                {dots.map((dot)=>(<button type="button" className={dot.class} key={dot.id} onClick={dot.move} ref={elem => (dotRef.current[dot.id-1] = elem)}></button>))}
            </DotPosition>
        </div>
    )
}

export default ExchangeView;