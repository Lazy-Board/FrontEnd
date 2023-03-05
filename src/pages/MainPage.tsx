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

type ModuleData = {
  [key: string]: boolean;
  exchangeYn: boolean;
  newsYn: boolean;
  quoteYn: boolean;
  stockYn: boolean;
  todolistYn: boolean;
  weatherYn: boolean;
  workYn: boolean;
  youtubeYn: boolean;
}

const MainPage = (): JSX.Element => {
  const accessToken = localStorage.getItem('accessToken')
  console.log(accessToken)
  
  const getModule = async() => {
    try {
      const response = await api.get(`/user/searchModule`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const { data, isFetching } = useQuery<ModuleData>(['modules'], getModule, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    notifyOnChangeProps:'tracked',
  });
  
  let filtered: string[] = [];
  if (data) {
    filtered = Object.entries(data)
      .filter(([_, checked]) => checked === true)
      .map(([key, _]) => key);
  }

  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      {/* 조건부 렌더링 */}
      {/* 로딩 이미지 넣자~~ */}
      {isFetching ? <div>Loading...</div> :
      <>
      {filtered.includes('weatherYn') && <WeatherView />}
      {filtered.includes('exchangeYn') && <ExchangeView />}
      {filtered.includes('stockYn') && <StockView />}
      {filtered.includes('newsYn') && <NewsMainView />}
      {filtered.includes('youtubeYn') && <YoutubeCarousel />}
      {filtered.includes('quoteYn') && <QuoteView />}
      {filtered.includes('todolistYn') && <TodoMainView />}
      {filtered.includes('workYn') && <TrafficView />}
      </>
      }
    </Content>
  );
};

export default MainPage;