import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { todosState, ITodoTypes } from "../../atom/Todo";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);

  const onComplete = useCallback(
    (id: number): void => {
      setTodos(
        todos.map((todo: ITodoTypes) => {
          return todo.id === id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo;
        })
      );
    },
    [setTodos, todos]
  );

  const onDelete = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo: ITodoTypes) => todo.id !== id));
    },
    [setTodos, todos]
  );

  return (
    <div className="w-full h-full relative border-solid border-white rounded-lg mb-2 overflow-x-hidden overflow-y-auto text-black">
      {todos.length > 0 ? (
        todos.map((todo: ITodoTypes) => {
          const { id, contents, isCompleted } = todo;

          return (
            <TodoItem
              key={id}
              id={id}
              contents={contents}
              isCompleted={isCompleted}
              onComplete={onComplete}
              onDelete={onDelete}
              todos={todos}
              setTodos={setTodos}
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