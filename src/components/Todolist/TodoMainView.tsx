import TodoItem from "./TodoItem";
import { useRecoilState } from "recoil";
import { ITodoTypes, todosState } from "../../atom/Todo";
import Todo from "./Todo";
import TodoInput from "./TodoInput";
const TodoMainView = () => {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);
  return (
    <div className="w-full h-fit mt-4 p-3 relative flex flex-wrap justify-between items-center border divide-y rounded-lg bg-white">
      <div className="self-start flex items-center mb-3">TO-DO</div>

      <Todo />
      <TodoInput />
    </div>
  );
};
export default TodoMainView;
