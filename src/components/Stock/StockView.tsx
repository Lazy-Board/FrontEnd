import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { StockLike, StockProps } from "../../atom/Stock";
import WidgetLoading from "../Modal/WidgetLoading";

const StockImg = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 100px;
    background-color: #999;
  `;

const StockView = () => {
  const MainViewList = useRecoilValueLoadable<StockProps[]>(StockLike);

  let LoadablegetStock: StockProps[] = [];
  switch (MainViewList.state) {
    case "hasValue":
      LoadablegetStock = MainViewList.contents;
      break;
  }
  
  return (
    <div className="w-full h-fit max-h-64 relative border border-slate-300 dark:border-slate-600 rounded-lg overflow-auto scrollbar-hide bg-white dark:bg-neutral">
      <div className="text-left flex item-center border-b border-slate-300 dark:border-slate-600 py-2 px-3 sticky top-0 w-full bg-white dark:bg-neutral">
        주식
        <Link to={`/stock`}>
          <BiChevronRight size={24} />
        </Link>
      </div>
      <div className="flex-row px-3 bg-white dark:bg-neutral">
        {MainViewList.state === "loading" ? (
          <WidgetLoading />
        ) : (
          LoadablegetStock.map((item: StockProps, index:number) => (
            <div key={item.stockName} 
            className={`flex w-full p-2 justify-between border-slate-300 dark:border-slate-600 ${index !== 0 && 'border-t'}`}
            >
              <div className="flex gap-2 pt-3">
                <StockImg
                  src={`/stockImage/${item.stockName}.svg`}
                  alt={item.stockName}
                />
                <span className="font-medium text-base">{item.stockName}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                    {item.price} 원
                </p>
                <span
                  className={`${
                    item.dayRange[0] === "+" && "text-red-500"
                  } ${item.dayRange[0] === "-" && "text-blue-500"} mr-2 text-sm`}
                >
                  {item.diffAmount}
                </span>
                <span
                  className={`text-sm ${
                    item.dayRange[0] === "+" && "text-red-500"
                  } ${item.dayRange[0] === "-" && "text-blue-500"}`}
                >
                  ({item.dayRange})
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StockView;
