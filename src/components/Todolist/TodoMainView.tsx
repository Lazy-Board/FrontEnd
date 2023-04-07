import Todo from "./Todo";
import TodoInput from "./TodoInput";

const TodoMainView = () => {
  return (
    <div className="w-full h-fit p-3 relative flex flex-wrap justify-between items-center rounded-lg bg-white dark:bg-neutral border border-slate-300 dark:border-slate-600">
      <div className="self-start flex items-center pb-3 w-full border-b border-slate-300 dark:border-slate-500">
        TO-DO
      </div>
      <Todo />
      <TodoInput />
    </div>
  );
};

export default TodoMainView;
