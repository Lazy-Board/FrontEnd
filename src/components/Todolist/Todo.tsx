import { todosState, ITodoTypes } from "../../atom/Todo";
import TodoItem from "./TodoItem";
import { useRecoilValueLoadable } from "recoil";
import LoadingBar from "../Stock/Loading";

const Todo = () => {
  const getTodo = useRecoilValueLoadable(todosState);

  let LoadablegetTodo: ITodoTypes[] = [];
  switch (getTodo.state) {
    case "hasValue":
      LoadablegetTodo = getTodo.contents;
      break;
  }

  // const onComplete = useCallback(
  //   (id: number): void => {
  //     setTodos(
  //       todos.map((todo: ITodoTypes) => {
  //         return todo.id === id
  //           ? { ...todo, isCompleted: !todo.isCompleted }
  //           : todo;
  //       })
  //     );
  //   },
  //   [setTodos, todos]
  // );

  return (
    <div className="w-full h-full relative mb-2 overflow-x-hidden overflow-y-auto text-black">
      {getTodo.state === "loading" ? (
        <LoadingBar />
      ) : (
        LoadablegetTodo.map((todo: ITodoTypes) => {
          const { id, content } = todo;

          return (
            <TodoItem
              key={id}
              id={id}
              contents={content}
              // isCompleted={isCompleted}
              // onComplete={onComplete}
            />
          );
        })
      )}
    </div>
  );
};

export default Todo;
