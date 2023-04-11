import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { getStockDetail, StockProps } from "../../atom/Stock";
import MainLoading from "../MenuBars/MainLoading";
import StockDetailAccordion from "./StockDetailAccordion";
import DetailTopBar from "../MenuBars/DetailTopBar";

const StockDetail = () => {
  const StockView = useRecoilValueLoadable<StockProps[]>(getStockDetail);

  let data: StockProps[] = [];
  switch (StockView.state) {
    case "hasValue":
      data = StockView.contents;
      break;
  }
  // const [stockData, setStockData] = useRecoilState(StockData);

  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;

  return (
    <>
      <DetailTopBar title="주식" />
      <Content className="max-w-md bg-stone-100 dark:bg-neutral dark:text-slate-100 p-3 pb-24">
        <div className="w-full mt-16">
          {StockView.state === "loading" ? (
            <MainLoading />
          ) : (
            <>
            <p className="text-sm my-2 text-left">마지막 업데이트 : {data[0].updateAt}</p>
            <div className="mt-4 border border-stone-300 dark:border-slate-600 rounded-lg overflow-hidden">
              {data.map((item: StockProps, index:any) => (
              <div key={item.stockName} >
                <StockDetailAccordion
                {...item}
                classes={index === data.length - 1 ? "border-none" : "border-b"}
                />
              </div>
            ))}
            </div>
            </>
          )}
        </div>
        {/* <button onClick={sortHandler}>낮은 가격순</button> */}
      </Content>
    </>
  );
};

export default StockDetail;
