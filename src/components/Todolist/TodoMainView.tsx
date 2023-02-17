import TodoItem from "./TodoItem";
import { useRecoilState } from "recoil";
import { ITodoTypes, todosState } from "../../atom/Todo/Todo";
import Todo from "./Todo";
const TodoMainView = () => {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);
  return (
    <div className="w-full h-fit max-h-56 mt-4 p-3 relative flex flex-wrap justify-between items-center border divide-y rounded-lg bg-white">
      <div className="self-start flex items-center mb-3 divide-y">TO-DO</div>

      <Todo />
    </div>
  );
};
export default TodoMainView;
