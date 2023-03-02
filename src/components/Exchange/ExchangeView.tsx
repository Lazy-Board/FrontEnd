import { BiChevronRight } from "react-icons/bi";
import { useSliders } from "../../hooks/useSliders";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { exchangeLike, ExchangeProps } from "../../atom/exchange";
import styled from "styled-components";
import DeleteModule from "../Buttons/DeleteModule";

const LongWidth = styled.div`
  position: relative;
  display: flex;
  left: 0;
`;

const DotPosition = styled.div`
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ExchangeView = (): JSX.Element => {
  const viewLoadable = useRecoilValueLoadable<ExchangeProps[]>(exchangeLike);
  let view = 'hasValue' === viewLoadable.state ? viewLoadable.contents : [];

  const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();

  const dots = [
    {
      id: 1,
      class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors",
      move: NextSlide,
    },
    {
      id: 2,
      class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors",
      move: PrevSlide,
    },
  ];

  return (
    <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
        <DeleteModule />
        <div className="self-start flex items-center">
            환율 
            <Link to={`/exchange`} ><BiChevronRight size={26}/></Link>
        </div>
        {view.length === 0  ? 
        (<div className="pt-1" ref={slideRef} style={{width:'400px'}}>
            <p className="py-5">아직 아무것도 설정하지 않으셨어요!</p>
            <Link to={`/exchange`} className="btn btn-primary">
                환율 상세보기
            </Link>
        </div>)
        : viewLoadable.state === 'loading' ? 
        <div className="w-full h-36 mt-1 bg-gray-300 rounded-md animate-pulse"></div>
        :
        (<LongWidth className="flex relative gap-3 overflow-hidden cursor-pointer" style={{width:`${2 < view.length ? '200%':'400px'}`}} ref={slideRef}>
            {view.map((item:any)=>(
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
        
        <DotPosition className={`absolute flex bottom-0 z-50 ${3 > view.length ? 'hidden':''}`}>
            {dots.map((dot)=>(<button type="button" className={dot.class} key={dot.id} onClick={dot.move} ref={elem => (dotRef.current[dot.id-1] = elem)}></button>))}
        </DotPosition>
    </div>
)
};

export default ExchangeView;
