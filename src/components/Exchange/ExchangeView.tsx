import { BiCaretDown, BiChevronRight } from "react-icons/bi";
import { useSliders } from "../../hooks/useSliders";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteModule from "../Buttons/DeleteModule";

const LongWidth = styled.div`
        width: 200%;
        position: relative;
        display:flex;
        left:0;
    `

const DotPosition = styled.div`
    left: 50%;
    transform: translate(-50%, -50%);
`

const ExchangeView = ():JSX.Element => {
    const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();

    const dots = [
        {id:1, class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors", move:NextSlide},
        {id:2, class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors", move:PrevSlide}
    ]

    const list = [
        {country:'홍콩 HKD', currency: 156.84, status: '-', compare: 0.63, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
        {country:'태국 THB', currency: 37.40, status: '-', compare: 0.37, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
        {country:'호주 AUD', currency: 870.01, status: '+', compare: 0.08, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
        {country:'미국 USD', currency: 1259.00, status: '-', compare: 1.00, buy: 158.95, sell: 152.81, send: 157.43, receive: 154.33},
    ]

    //체크한 환율이 아무것도 없으면 '이런! 아직 아무것도 체크하지 않으셨어요!'
    //+ 인디케이터 안보이게

    return (
        <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
            <DeleteModule />
            <div className="self-start flex items-center">
                환율 
                <Link to={`/exchange`} ><BiChevronRight  size={26}/> </Link>
            </div>
            <LongWidth className="flex relative gap-3 overflow-hidden" ref={slideRef}>
                {list.map(item=>(
                    <div className="w-1/4 p-2 mt-2 text-left border border-slate-300 rounded-lg select-none">
                        <p>{item.country} - KRW</p>
                        <p className="text-2xl font-semibold">{item.currency.toFixed(2)}</p>
                        <div className={`flex mt-2 items-center ${item.status==='-' ? 'text-blue-600' : 'text-red-500'}`}>
                            <BiCaretDown className="inline-block" size={20}/>
                            {item.status}
                            {item.compare.toFixed(2)}
                        </div>
                    </div>
                ))}
            </LongWidth>
            <DotPosition className="absolute flex bottom-0 z-50">
                {dots.map((dot)=>(<button type="button" className={dot.class} key={dot.id} onClick={dot.move} ref={elem => (dotRef.current[dot.id-1] = elem)}></button>))}
            </DotPosition>
        </div>
    )
}

export default ExchangeView;