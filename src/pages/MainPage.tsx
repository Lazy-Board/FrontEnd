import styled from "styled-components";
import WeatherView from "../components/Weather/WeatherView";
import QuoteView from "../components/Quote/QuoteView";
import ExchangeView from "../components/Exchange/ExchangeView";
import TrafficView from "../components/Traffic/TrafficView";
import YoutubeCarousel from "../components/Youtube/YoutubeCarousel";
import StockView from "../components/Stock/StockView";
import NewsMainView from "../components/News/NewsMainView";
import TodoMainView from "../components/Todolist/TodoMainView";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const MainPage = (): JSX.Element => {
  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      {/* 여기에 위젯 컴포넌트들이.. */}
      <WeatherView />
      <QuoteView />
      <ExchangeView />
      <TrafficView />
      <YoutubeCarousel />
      <StockView />
      <TodoMainView />
      <NewsMainView />
    </Content>
  );
};

export default MainPage;
