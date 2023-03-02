import { useEffect } from "react";

import { todosState, ITodoTypes } from "../../atom/Todo";
import TodoItem from "./TodoItem";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { api } from "../../atom/signin";
const Todo = () => {
  const getTodo = useRecoilValueLoadable(todosState);

  let LoadablegetTodo: ITodoTypes[] = [];
  switch (getTodo.state) {
    case "hasValue":
      LoadablegetTodo = getTodo.contents;
      break;
    case "hasError":
      console.log(getTodo.contents.message);
      break;
    case "loading":
      return <progress className="progress w-56">Loading...</progress>;
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
      {LoadablegetTodo.length > 0 ? (
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
      ) : (
        <div className="w-full text-center absolute top-1/2 left-0 font-bold">
          Todo가 없습니다. 자유롭게 추가해보세요!
        </div>
      )}
    </div>
  );
};

export default Todo;
