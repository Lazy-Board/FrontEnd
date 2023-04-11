import styled from "styled-components";
import WeatherView from "../components/Weather/WeatherView";
import QuoteView from "../components/Quote/QuoteView";
import ExchangeView from "../components/Exchange/ExchangeView";
import TrafficView from "../components/Traffic/TrafficView";
import YoutubeCarousel from "../components/Youtube/YoutubeCarousel";
import StockView from "../components/Stock/StockView";
import NewsMainView from "../components/News/NewsMainView";
import TodoMainView from "../components/Todolist/TodoMainView";
import MainLoading from "../components/MenuBars/MainLoading";
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

  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      {/* 조건부 렌더링 */}
      {isFetching ? (
        <MainLoading />
      ) : (
        <>
          {filtered.includes("weatherYn") && <WeatherView />}
          {filtered.includes("exchangeYn") && <ExchangeView />}
          {filtered.includes("stockYn") && <StockView />}
          {filtered.includes("newsYn") && <NewsMainView />}
          {filtered.includes("youtubeYn") && <YoutubeCarousel />}
          {filtered.includes("quoteYn") && <QuoteView />}
          {filtered.includes("todolistYn") && <TodoMainView />}
          {filtered.includes("workYn") && <TrafficView />}
        </>
      )}
    </Content>
  );
};

export default MainPage;
