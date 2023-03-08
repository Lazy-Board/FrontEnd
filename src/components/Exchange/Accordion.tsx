import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";
import { exchangeWish, exchangeLike, getExchangeDetail, ExchangeProps } from "../../atom/exchange";
import { api } from "../../atom/signin";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import ToggleButton from "./ToggleButton";
import AccordionContent from "./AccordionContent";
import { ErrorModal } from "../Modal/ErrorModal";

const Flag = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: #999;
`;

const Accordions = (props: ExchangeProps): JSX.Element => {
  const {
    countryName,
    currencyName,
    tradingStandardRate,
    comparedPreviousDay,
    fluctuationRate,
    classes,
    isOpened,
    handleOpening,
  } = props;

  const [height, setHeight] = useState<string>("0px");
  const [wishlist, setWishlist] = useRecoilState<String[]>(exchangeWish);
  const exchangeDetails = useRecoilValue<ExchangeProps[]>(getExchangeDetail);
  const [selectedExchange, setSelectedExchange] = useRecoilState<ExchangeProps[]>(exchangeLike);
  const [exchangeLikeButton, setExchangeLikeButton] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const contentElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(isOpened ? "180px" : "0px");
  }, [isOpened, contentElement]);

  const data = exchangeDetails.filter((item: ExchangeProps) =>
    wishlist.includes(item.currencyName)
  );

  const handleWishlist = async () => {
    if (wishlist.includes(currencyName)) {
      await api.post("/exchange/update", { currencyName: `${currencyName}X` });
      setWishlist(wishlist.filter((id: String) => id !== currencyName));
    } else if (wishlist.length < 4) {
      await api.post("/exchange/update", { currencyName: currencyName });
      setWishlist([...wishlist, currencyName]);
    } else {
      setError("4개까지만 체크할 수 있습니다.");
      return;
    }
    setExchangeLikeButton(!exchangeLikeButton);
    setSelectedExchange(data);
  };

  return (
    <>
    <div className={`w-full px-1 py-2 ${classes} border-slate-300`}>
        <div className="flex justify-between cursor-pointer" >
            <div className="flex items-center pl-1 gap-2">
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
                <input type="checkbox" id="checked" className="hidden"/>
                <label onClick={handleWishlist} className="transition-colors cursor-pointer" htmlFor="checked">
                  {wishlist.find((item) => item === currencyName) ? (
                    <RiStarFill color="#f5c516" size={20} />
                  ) : (
                    <RiStarLine color="#999" size={20} />
                  )}
                </label>
                <ToggleButton state={isOpened} click={handleOpening}/>
            </div>
        </div>
        <AccordionContent 
            ref={contentElement}
            height={height}
            {...props}
        />
    </div>
    {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  )
};

export default Accordions;
