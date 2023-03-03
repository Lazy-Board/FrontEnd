import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { exchangeWish, exchangeLike, getExchangeDetail, getExchangeDetails, ExchangeProps } from "../../atom/exchange";
import { api } from "../../atom/signin";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import ToggleButton from "./ToggleButton";
import AccordionContent from "./AccordionContent";

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

  const queryClient = useQueryClient();
  const [height, setHeight] = useState<string>("0px");
  const [wishlist, setWishlist] = useRecoilState<String[]>(exchangeWish);
  // const exchangeDetails = useRecoilValue<ExchangeProps[]>(getExchangeDetail);
  const {data: exchangeDetails, isLoading} = useQuery(['exchangeDetails'], getExchangeDetails, {
    refetchOnWindowFocus: false,
    staleTime:Infinity,
  })
  const [selectedExchange, setSelectedExchange] = useRecoilState<ExchangeProps[]>(exchangeLike);
  const [exchangeLikeButton, setExchangeLikeButton] = useState(false);
  const contentElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(isOpened ? "180px" : "0px");
  }, [isOpened, contentElement]);

  const data = exchangeDetails.filter((item: ExchangeProps) =>
    wishlist.includes(item.currencyName)
  );

  const updateX = useMutation((currencyName: string) =>
    api.post(`/exchange/update`, { currencyName: `${currencyName}X` })
  );

  const updateLike = useMutation((currencyName: string) =>
    api.post(`/exchange/update`, { currencyName: currencyName })
  );

  const handleWishlist = async () => {
    if (wishlist.includes(currencyName)) {
      await updateX.mutateAsync(currencyName)
      setWishlist(wishlist.filter((id: String) => id !== currencyName));
    } else if (wishlist.length < 4) {
      await updateLike.mutateAsync(currencyName)
      setWishlist([...wishlist, currencyName]);
    } else {
      alert("4개까지만 체크할 수 있습니다.");
      return;
    }
    queryClient.invalidateQueries(['exchangeDetails']);
    queryClient.invalidateQueries(['exchangeView']);
    setExchangeLikeButton(!exchangeLikeButton);
    setSelectedExchange(data);
  };

  return (
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
  )
};

export default Accordions;
