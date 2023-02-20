import Accordion from "./Accordion";
import styled from "styled-components";
import { useState } from "react";
import DetailTopBar from "../MenuBars/DetailTopBar";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const ExchangeDetail = (): JSX.Element => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>(-1);

  const list = [
    {
      country: "홍콩 HKD",
      currency: 156.84,
      status: "-",
      compare: 0.63,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "태국 THB",
      currency: 37.4,
      status: "-",
      compare: 0.37,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "호주 AUD",
      currency: 870.01,
      status: "+",
      compare: 0.08,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "미국 USD",
      currency: 1259.0,
      status: "-",
      compare: 1.0,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "일본 JPY",
      currency: 131.36,
      status: "-",
      compare: 0.46,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "일본 JPZ",
      currency: 131.36,
      status: "-",
      compare: 0.46,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "뉴질랜드 NZD",
      currency: 800.6,
      status: "+",
      compare: 0.32,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "뉴질랜드 NZE",
      currency: 800.6,
      status: "+",
      compare: 0.32,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "뉴질랜드 NZF",
      currency: 800.6,
      status: "+",
      compare: 0.32,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
    {
      country: "뉴질랜드 NZG",
      currency: 800.6,
      status: "+",
      compare: 0.32,
      buy: 158.95,
      sell: 152.81,
      send: 157.43,
      receive: 154.33,
    },
  ];

  return (
    <>
      <DetailTopBar title="환율" />
      <Content className="max-w-md bg-stone-100 p-3">
        <div className="mt-16 text-left text-sm">
          <p>고시일시</p>
          <p>2023.02.10 18:01 (하나은행 고시회차 278회)</p>
        </div>
        <div className="w-full h-fit mt-5 p-2 pt-1 border border-slate-300 rounded-lg bg-white">
          {list.map((item, index) => (
            <Accordion
              classes={index === list.length - 1 ? "pb-0" : "border-b pb-0"}
              country={item.country}
              currency={item.currency}
              status={item.status}
              compare={item.compare}
              buy={item.buy}
              sell={item.sell}
              send={item.send}
              receive={item.receive}
              isOpened={openAccordionIndex === index}
              handleOpening={() =>
                openAccordionIndex === index
                  ? setOpenAccordionIndex(-1)
                  : setOpenAccordionIndex(index)
              }
              key={item.country}
            />
          ))}
        </div>
      </Content>
    </>
  );
};

export default ExchangeDetail;
