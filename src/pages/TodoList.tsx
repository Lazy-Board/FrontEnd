import TodoInput from "../components/Todolist/TodoInput";
import Todo from "../components/Todolist/Todo";
import TodoTitle from "../components/Todolist/TodoTitle";
import styled from "styled-components";
export default function TodoList() {
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;
  return (
    <Content className="max-w-md bg-stone-100 p-3">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 flex mt-5 h-fit">
        <div className="m-auto flex flex-col items-center justify-center">
          <TodoTitle />
          <Todo />
          <TodoInput />
        </div>
      </div>
    </Content>
  );
}
