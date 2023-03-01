import Accordion from "./Accordion";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { getExchangeDetail, AccordionProps } from "../../atom/exchange";
import DetailTopBar from "../MenuBars/DetailTopBar";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const ExchangeDetail = (): JSX.Element => {
  const data = useRecoilValue<AccordionProps[]>(getExchangeDetail);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>(-1);

  return (
    <>
      <DetailTopBar title="환율" />
      <Content className="max-w-md bg-stone-100 p-3">
        <div className="mt-16 text-left text-sm">
          <p>고시일시</p>
          <p>
            {data[0].updateAt.replace("년", "년 ").replace("월", "월 ")}
            &nbsp;({data[0].round})
          </p>
        </div>
        <div className="w-full h-fit mt-5 p-2 pt-1 border border-slate-300 rounded-lg bg-white">
          {data.map((item:any, index:any) => (
            <Accordion
              classes={index === data.length - 1 ? "pb-0" : "border-b pb-0"}
              {...item}
              isOpened={openAccordionIndex === index}
              handleOpening={() =>
                openAccordionIndex === index
                  ? setOpenAccordionIndex(-1)
                  : setOpenAccordionIndex(index)
              }
              key={item.countryName}
            />
          ))}
        </div>
      </Content>
    </>
  );
};

export default ExchangeDetail;
