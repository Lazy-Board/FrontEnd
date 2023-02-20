import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getStockDetail } from "../../atom/Stock";
import DetailTopBar from "../MenuBars/DetailTopBar";
import StockDetailAccordion from "./StockDetailAccordion";

const StockDetail = () => {
  const data = useRecoilValue(getStockDetail);

  // const [stockData, setStockData] = useRecoilState(StockData);
  console.log(data);
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;

  return (
    <>
      <DetailTopBar title="주식" />
      <Content className="max-w-md bg-stone-100 p-3">
        <div className="w-full mt-12">
          {data.map((item: any) => (
            <>
              <StockDetailAccordion
                stockName={item.stockName}
                price={item.price}
                dayRange={item.dayRange}
                diffAmount={item.diffAmount}
                lowPrice={item.lowPrice}
                highPrice={item.highPrice}
                tradingVolume={item.tradingVolume}
                updateAt={item.updateAt}
              ></StockDetailAccordion>
            </>
          ))}
        </div>
        {/* <button onClick={sortHandler}>낮은 가격순</button> */}
      </Content>
    </>
  );
};

export default StockDetail;
