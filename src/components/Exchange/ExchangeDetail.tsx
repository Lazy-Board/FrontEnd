import Accordion from "./Accordion";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { getExchangeDetail, ExchangeProps } from "../../atom/exchange";
import DetailTopBar from "../MenuBars/DetailTopBar";
import MainLoading from "../MenuBars/MainLoading";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const ExchangeDetail = (): JSX.Element => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>(0);
  const dataLoadable = useRecoilValueLoadable<ExchangeProps[]>(getExchangeDetail);
  let data = 'hasValue' === dataLoadable.state ? dataLoadable.contents : [];

  return (
    <>
      <DetailTopBar title="환율" />
      <Content className="max-w-md bg-stone-100 dark:bg-neutral dark:text-slate-200 p-3">
        {dataLoadable.state === 'loading' ? <MainLoading/> : (
          <>
          <div className="mt-16 text-left text-sm">
            <p>고시일시</p>
            <p>
              {data[0].updateAt.replace("년", "년 ").replace("월", "월 ")}
            &nbsp;({data[0].round})
            </p>
          </div>
          <div className="w-full h-fit mt-5 p-2 pt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-neutral">
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
          </>
        )}
      </Content>
    </>
  );
};

export default ExchangeDetail;
