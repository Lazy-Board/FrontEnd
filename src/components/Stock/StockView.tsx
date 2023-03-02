import { useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { StockLike, StockProps } from "../../atom/Stock";
const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

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
  return (
    <div className="w-full h-fit max-h-72 mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
      <div className="text-left font-semibold flex">
        주식
        <Link to={`/stock`}>
          <BiChevronRight size={26} />
        </Link>
      </div>

      {LoadablegetStock.map((item: any) => (
        <>
          <div
            className="flex w-full p-2 mt-4 justify-start border-t"
            key={item.StockName}
          >
            <span className="">{item.stockName}</span>
            <span className="font-semibold ml-auto">{item.price} 원</span>
          </div>
          <div className="flex">
            <span
              className={`${
                item.dayRange[0] === "+" ? "text-red-500" : "text-blue-500"
              } ml-auto mr-2`}
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
