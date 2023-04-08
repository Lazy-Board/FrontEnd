import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  StockLike,
  StockProps,
  StockWish,
  getStockDetail,
} from "../../atom/Stock";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { api } from "../../atom/signin";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import styled from "styled-components";

const StockImg = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 100px;
    background-color: #999;
  `;

const StockDetailAccordion = ({
  stockName,
  price,
  diffAmount,
  dayRange,
  lowPrice,
  highPrice,
  tradingVolume,
  updateAt,
  classes
}: StockProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useRecoilState<String[]>(StockWish);
  const StockDetail = useRecoilValueLoadable<StockProps[]>(getStockDetail);
  const [selectedStock, setSelectedStock] =
    useRecoilState<StockProps[]>(StockLike);
  const [StockLikeButton, setStockLikeButton] = useState(false);

  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );
  const Ref = useRef<HTMLDivElement>(null);

  let data: StockProps[] = [];

  switch (StockDetail.state) {
    case "hasValue":
      data = StockDetail.contents.filter((item: StockProps) =>
        wishlist.includes(item.stockName)
      );
      break;
  }
  useEffect(() => {
    setContentHeight(Ref.current?.scrollHeight);
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleWishlist = async () => {
    if (wishlist.includes(stockName)) {
      await api.post("stock/update", { stockName: `${stockName}F` });
      setWishlist(wishlist.filter((id: String) => id !== stockName));
    } else {
      await api.post("stock/update", { stockName: stockName });
      setWishlist([...wishlist, stockName]);
    }
    setStockLikeButton(!StockLikeButton);
    setSelectedStock([...selectedStock, ...data]);
  };

  return (
    <div className={`border-stone-300 dark:border-slate-600 ${classes}`}>
      <div className="flex items-center w-full py-2 px-4 focus:outline-none bg-white dark:bg-neutral">
        <StockImg
          src={`/stockImage/${stockName}.svg`}
          alt={stockName}
          className="mr-2"
        />
        <span className="mr-auto text-sm my-2 font-medium">
          {StockDetail.state === "loading" ? "loading..." : stockName}
        </span>
        <span className="text-sm mr-2">{price}</span>
        <span
          className={`ml-2 mr-3 text-sm ${
            dayRange[0] === "+" ? "text-red-500" : "text-blue-500"
          }`}
        >
          {dayRange}
        </span>
        <button onClick={handleWishlist} className="mr-1">
          {wishlist.find((item) => item === stockName) ? (
            <RiStarFill color="#f5c516" size={20} />
          ) : (
            <RiStarLine color="#999" size={20} />
          )}
        </button>
        <button type="button" onClick={toggleAccordion} className="ml-2">
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen mb-2 bg-white dark:bg-neutral" : "max-h-0"
        } overflow-hidden transition-max-height duration-200`}
        style={{ maxHeight: isOpen ? contentHeight! : 0 }}
        ref={Ref}
      >
        <div className="flex ml-4">
          <div className="flex flex-col mr-auto ml-1 mb-1">
            <span className="text-sm">전일 대비 가격변동 : {diffAmount}</span>
            <span className="text-sm my-2 self-start">
              전일 대비 등락률 : {dayRange}
            </span>
          </div>
          <div className="flex flex-col mr-auto mb-1">
            <span className="text-sm font-bold self-end text-red-500">
              전일 최고가 : {highPrice}
            </span>
            <span className="text-sm font-bold mt-2 self-start text-blue-500">
              전일 최저가 : {lowPrice}
            </span>
          </div>
        </div>
        <div className="mt-1 ml-5">
          <p className="text-sm mb-2 font-semibold">
            전일 거래량 : {tradingVolume}
          </p>
          <p className="text-sm my-2">마지막 조회일시 : {updateAt}</p>
        </div>
      </div>
    </div>
  );
};

export default StockDetailAccordion;
