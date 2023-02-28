import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { StockLike, StockProps } from "../../atom/Stock";
const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const StockView = () => {
  const MainViewList = useRecoilValue<StockProps[]>(StockLike);

  return (
    <div className="w-full max-h-64 mt-5 p-3 pt-2 pb-6 border border-slate-300 rounded-lg overflow-hidden bg-white">
      <div className="text-left font-semibold">주식</div>
      {MainViewList.map((item: any) => (
        <>
          <div
            className="flex w-full p-2 mt-4 justify-start border-t"
            key={item.StockName}
          >
            <div className="flex w-2/5">
              <span className="">{item.stockName}</span>
              <span className="font-semibold ml-auto">{item.price} 원</span>
            </div>
            <div className="flex">
              <span
                className={`${
                  item.dayRange > 0 ? "text-red-500" : "text-blue-500"
                } ml-auto mr-2`}
              >
                {item.dayRange}
              </span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default StockView;
