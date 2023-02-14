import TodoInput from "../components/Todolist/TodoInput";
import Todo from "../components/Todolist/Todo";
import TodoTitle from "../components/Todolist/TodoTitle";

export default function TodoList() {
  return (
    <div className="w-1/2 bg-blue-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 h-1/2 flex">
      <div className="m-auto flex flex-col items-center justify-center">
        <TodoTitle />
        <Todo />
        <TodoInput />
      </div>
    </div>
  );
}
