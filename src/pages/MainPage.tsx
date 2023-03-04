import styled from "styled-components";
import WeatherView from "../components/Weather/WeatherView";
import QuoteView from "../components/Quote/QuoteView";
import ExchangeView from "../components/Exchange/ExchangeView";
import TrafficView from "../components/Traffic/TrafficView";
import YoutubeCarousel from "../components/Youtube/YoutubeCarousel";
import StockView from "../components/Stock/StockView";
import NewsMainView from "../components/News/NewsMainView";
import TodoMainView from "../components/Todolist/TodoMainView";
import { api } from "../atom/signin";
import { useQuery } from "react-query";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

interface Module {
  id: number | string;
  name: string;
  checked: boolean;
}

const MainPage = (): JSX.Element => {
  const { data, isLoading } = useQuery<Module>('modules', () => api.get(`/user/searchModule`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  // let filtered = Object.values(!data).filter((checked) => checked === false) ? obj = Object.keys(!data).map((i) => i) : "";
  
  // let filtered: string[] = [];
  // if (data) {
  //   filtered = Object.entries(data)
  //     .filter(([_, { checked }]) => !checked)
  //     .map(([key, _]) => key);
  // }

  // const modulesRender = data?.filter((module) => module.checked)?.map((module) => module.id) ?? [];

  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      {/* 조건부 렌더링 */}
      <ExchangeView />
      <NewsMainView />
      <QuoteView />
      <StockView />
      <TodoMainView />
      <WeatherView />
      <TrafficView />
      <YoutubeCarousel />
    </Content>
  );
};

export default MainPage;
