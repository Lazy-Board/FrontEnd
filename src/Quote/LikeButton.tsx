import { useState } from "react";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { StockLike } from "../atom/Stock";

const LikeButton = () => {
  const [like, setLike] = useState(false);
  const [likeStock, setLikeStock] = useRecoilState(StockLike);
  const wishAddHandler = () => {
    setLike(!like);
  };

  return (
    <>
      <input type="checkbox" id="checked" className="hidden" />
      <label
        onClick={wishAddHandler}
        className="inline-block transition-colors cursor-pointer"
        htmlFor="checked"
      >
        {like ? (
          <RiStarFill color="#f5c516" size={20} />
        ) : (
          <RiStarLine color="#999" size={20} />
        )}
      </label>
    </>
  );
};

export default LikeButton;
