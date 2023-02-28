import { useState } from "react";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
import { StockLike, StockLikeButton } from "../../atom/Stock";
export const FillLikeButton = () => {
  const [StockLikeButton, setStockLikeButton] = useState(true);

  const wishAddHandler = () => {
    setStockLikeButton(!StockLikeButton);
  };

  return (
    <>
      <input type="checkbox" id="checked" className="hidden" />
      <label
        onClick={wishAddHandler}
        className="inline-block transition-colors cursor-pointer"
        htmlFor="checked"
      >
        {StockLikeButton ? (
          <RiStarFill color="#f5c516" size={20} />
        ) : (
          <RiStarLine color="#999" size={20} />
        )}
      </label>
    </>
  );
};

export const EmptyLikeButton = () => {
  const [StockLikeButton, setStockLikeButton] = useState(false);

  const wishAddHandler = () => {
    setStockLikeButton(!StockLikeButton);
  };

  return (
    <>
      <input type="checkbox" id="checked" className="hidden" />
      <label
        onClick={wishAddHandler}
        className="inline-block transition-colors cursor-pointer"
        htmlFor="checked"
      >
        {StockLikeButton ? (
          <RiStarFill color="#f5c516" size={20} />
        ) : (
          <RiStarLine color="#999" size={20} />
        )}
      </label>
    </>
  );
};
