import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { StockLike } from "../../atom/Stock";
import { useRecoilState } from "recoil";
import LikeButton from "../../Quote/LikeButton";
type AccordionProps = {
  stockName: string;
  price: number;
  dayRange: any;
  diffAmount: string;
  lowPrice: number;
  highPrice: number;
  tradingVolume: number;
  updateAt: string;
};

const StockDetailAccordion = ({
  stockName,
  price,
  diffAmount,
  dayRange,
  lowPrice,
  highPrice,
  tradingVolume,
  updateAt,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useRecoilState<String[]>(StockLike);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );
  const Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContentHeight(Ref.current?.scrollHeight);
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const handleWishlist = () => {
    const isInWishlist = wishlist.includes(stockName);

    if (!isInWishlist) {
      setWishlist([...wishlist, stockName]);
    } else {
      setWishlist(wishlist.filter((id) => id !== stockName));
    }
  };

  useEffect(() => {
    console.log(wishlist);
  }, [wishlist]);

  return (
    <div className="border-none divide-y-2 ">
      <div className="flex items-center w-full py-2 px-4 focus:outline-none bg-white">
        <span className="mr-auto text-sm my-2 font-bold">{stockName}</span>
        <span className="text-sm mr-2">{price}</span>
        <span
          className={`mr-2 ${dayRange > 0 ? "text-red-500" : "text-blue-500"}`}
        >
          {dayRange}
        </span>
        <button className="mt-2" onClick={handleWishlist}>
          <LikeButton />
        </button>
        <button type="button" onClick={toggleAccordion} className="ml-2">
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen bg-white" : "max-h-0"
        } overflow-hidden transition-max-height duration-200`}
        style={{ maxHeight: isOpen ? contentHeight : 0 }}
        ref={Ref}
      >
        <div className="flex ml-4">
          <div className="flex flex-col mr-auto ml-2 my-4">
            <span className="text-sm">전일 대비 가격변동 : {diffAmount}</span>
            <span className="text-sm my-2 self-start">
              전일 대비 등락률 : {dayRange}
            </span>
          </div>
          <div className="flex flex-col mr-auto my-4">
            <span className="text-sm font-bold self-end text-red-500">
              전일 최고가 : {highPrice}
            </span>
            <span className="text-sm font-bold mt-2 self-start text-blue-500">
              전일 최저가 : {lowPrice}
            </span>
          </div>
        </div>
        <div>
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
