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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(filtered);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    filtered = items;
  };

  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      {/* 조건부 렌더링 */}
      {isFetching ? (
        <MainLoading />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {isFetching ? (
            <MainLoading />
          ) : (
            <Droppable droppableId="modules" type="MODULE">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filtered.map((key, index) => {
                    return (
                      <Draggable draggableId={key} index={index} key={key}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {key}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </DragDropContext>
      )}
    </Content>
  );
};

export default MainPage;
