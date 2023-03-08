import TodoInput from "../components/Todolist/TodoInput";
import Todo from "../components/Todolist/Todo";
import TodoTitle from "../components/Todolist/TodoTitle";
import styled from "styled-components";
import DetailTopBar from "../components/MenuBars/DetailTopBar";
export default function TodoList() {
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;
  return (
    <>
      <DetailTopBar title="To-Do" />
      <Content className="max-w-md bg-stone-100 p-3">
        <div className="w-full mt-5 h-fit p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
          <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 flex ">
            <div className="m-auto flex flex-col items-center justify-center ">
              <TodoTitle />
              <Todo />
              <TodoInput />
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
