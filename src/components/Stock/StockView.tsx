import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { StockLike, StockProps } from "../../atom/Stock";

const StockView = () => {
  const MainViewList = useRecoilValueLoadable<StockProps[]>(StockLike);

  let LoadablegetStock: StockProps[] = [];
  switch (MainViewList.state) {
    case "hasValue":
      LoadablegetStock = MainViewList.contents;
      break;
    case "hasError":
      console.log(MainViewList.contents.message);
      break;
    case "loading":
      return <progress className="progress w-56">Loading...</progress>;
  }
  const StockImg = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 100px;
    background-color: #999;
  `;
  return (
    <div className="w-full h-fit max-h-72 mt-4 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-auto scrollbar-hide bg-white">
      <div className="text-left font-semibold flex">
        주식
        <Link to={`/stock`}>
          <BiChevronRight size={26} />
        </Link>
      </div>

      {LoadablegetStock.map((item: StockProps) => (
        <>
          <div
            className="flex w-full p-2 mt-4 justify-start border-t"
            key={item.stockName}
          >
            <span className="">{item.stockName}</span>
            <span className="font-semibold ml-auto">{item.price} 원</span>
          </div>
          <div className="flex">
            <StockImg
              src={`/stockImage/${item.stockName}.svg`}
              alt={item.stockName}
              className="ml-5 mr-auto"
            />
            <span
              className={`${
                item.dayRange[0] === "+" ? "text-red-500" : "text-blue-500"
              } mr-2`}
            >
              {item.diffAmount}
            </span>
            <span
              className={`${
                item.dayRange[0] === "+" ? "text-red-500" : "text-blue-500"
              } mx-2`}
            >
              {item.dayRange}
            </span>
          </div>
        </>
      ))}
    </div>
  );
};

export default StockView;
