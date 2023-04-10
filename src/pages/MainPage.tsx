import styled from "styled-components";
import MainLoading from "../components/MenuBars/MainLoading";
import WeatherView from "../components/Weather/WeatherView";
import QuoteView from "../components/Quote/QuoteView";
import ExchangeView from "../components/Exchange/ExchangeView";
import TrafficView from "../components/Traffic/TrafficView";
import YoutubeCarousel from "../components/Youtube/YoutubeCarousel";
import StockView from "../components/Stock/StockView";
import NewsMainView from "../components/News/NewsMainView";
import TodoMainView from "../components/Todolist/TodoMainView";
import { getModule, ModuleData } from "../atom/users";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const MainPage = (): JSX.Element => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { data, isFetching } = useQuery<ModuleData>(["modules"], getModule, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    notifyOnChangeProps: "tracked",
  });

  let filtered: string[] = [];
  if (data) {
    filtered = Object.entries(data)
      .filter(([_, checked]) => checked === true)
      .map(([key, _]) => key);
  }

  useEffect(() => {
    accessToken === null ? navigate("/login") : "";
  }, []);

  // react-grid-layout 을 사용한다면 widgetList에 layout 관련 요소 추가해야 함
  const widgetList = [
    {id:"exchangeYn", content: <ExchangeView />},
    {id:"newsYn", content: <NewsMainView />},
    {id:"quoteYn", content: <QuoteView />},
    {id:"stockYn", content: <StockView />},
    {id:"todolistYn", content: <TodoMainView />},
    {id:"weatherYn", content: <WeatherView />},
    {id:"workYn", content: <TrafficView />},
    {id:"youtubeYn", content: <YoutubeCarousel/>},
]
  // useEffect(() => {
  //   accessToken === null ? navigate("/login") : "";
  // }, []);

  return (
    <Content className={`max-w-md bg-stone-100 dark:bg-neutral px-3 py-20 flex flex-col gap-5 dark:text-slate-100 transition-colors ${isFetching && 'pt-28'}`}>
      {/* 조건부 렌더링 */}
      {isFetching ? (
        <MainLoading />
      ) : (
        <>
          {widgetList.filter(item=> filtered.includes(item.id)).map(item=>(
              <div key={item.id}>
                  {item.content}
              </div>
          ))}
        </>
      )}
    </Content>
  );
};

export default MainPage;
