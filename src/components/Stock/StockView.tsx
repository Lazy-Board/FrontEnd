import styled from "styled-components";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;
const StockList = [
  { id: "1", stockname: "삼성전자", price: "40,120" },
  { id: "2", stockname: "테슬라", price: "80,540" },
];
const StockView = () => {
  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
        <div className="text-left font-semibold">주식</div>

        {StockList.map((item) => (
          <div
            className="flex w-full p-2 mt-4 justify-start border-t"
            key={item.id}
          >
            <span className="">{item.stockname}</span>
            <span className="font-semibold ml-auto">{item.price} 원</span>
          </div>
        ))}
      </div>
    </Content>
  );
};

export default StockView;
