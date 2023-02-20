import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getStockDetail, getStockMain, StockLike } from "../../atom/Stock";
const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const StockView = () => {
  const StockList = useRecoilValue(getStockMain);
  let LikeList = useRecoilValue(StockLike);
  let Like = StockList.filter((item: any) => LikeList.includes(item.stockName));

  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
        <div className="text-left font-semibold">주식</div>

        {Like.map((item: any) => (
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
                  item.dayRange > 0 ? "text-red-500" : "text-blue-500"
                } ml-auto mr-2`}
              >
                {item.dayRange}
              </span>
            </div>
          </>
        ))}
      </div>
    </Content>
  );
};

export default StockView;
