import Todo from "./Todo";
import TodoInput from "./TodoInput";
const TodoMainView = () => {
  return (
    <div className="w-full h-fit mt-4 p-3 relative flex flex-wrap justify-between items-center divide-y rounded-lg bg-white dark:bg-neutral border border-slate-300 dark:border-slate-600">
      <div className="self-start flex items-center mb-3 w-full border-b-slate-300 dark:border-b-slate-600">
        TO-DO
      </div>

      <Todo />
      <TodoInput />
    </div>
  );
};
export default TodoMainView;
