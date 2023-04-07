import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { StockLike, StockProps } from "../../atom/Stock";
// import LoadingBar from "./Loading";
import WidgetLoading from "../Modal/WidgetLoading";

const StockView = () => {
  const MainViewList = useRecoilValueLoadable<StockProps[]>(StockLike);

  let LoadablegetStock: StockProps[] = [];
  switch (MainViewList.state) {
    case "hasValue":
      LoadablegetStock = MainViewList.contents;
      break;
  }
  const StockImg = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 100px;
    background-color: #999;
  `;
  return (
    <div className="w-full h-fit max-h-72 relative border border-slate-300 dark:border-slate-600 rounded-lg overflow-auto scrollbar-hide bg-white dark:bg-neutral">
      <div className="text-left font-semibold flex p-3 pb-2 w-full sticky top-0 bg-white dark:bg-neutral">
        주식
        <Link to={`/stock`}>
          <BiChevronRight size={26} />
        </Link>
      </div>
      <div className="flex-row px-3 bg-white dark:bg-neutral">
        {MainViewList.state === "loading" ? (
          <WidgetLoading />
        ) : (
          LoadablegetStock.map((item: StockProps) => (
            <>
              <div
                className="flex w-full p-2 mt-2 border-t border-slate-300 dark:border-slate-600 justify-start"
                key={item.stockName}
              >
                <span className="">{item.stockName}</span>
                <span className="font-semibold ml-auto">{item.price} 원</span>
              </div>
              <div className="flex pt-1 mb-2">
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
          ))
        )}
      </div>
    </div>
  );
};

export default StockView;
