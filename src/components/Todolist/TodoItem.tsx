import React, { useCallback, useEffect, useState } from "react";
import { ITodoTypes, todosState } from "../../atom/Todo";
import { FaPen } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { SetterOrUpdater } from "recoil";
import TodoModal from "./TodoModal";
import { api } from "../../atom/signin";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
interface PropTypes {
  id: number;
  contents: string;
  // isCompleted: boolean;

  // onComplete: (id: number) => void;
}

const TodoItem = ({
  id,
  contents,
}: // isCompleted,
// onComplete,

PropTypes) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modifyContents, setModifyContents] = useState<string>("");
  // const todos = useRecoilValue<ITodoTypes[]>(todoSelector);
  // const setTodos = useSetRecoilState<ITodoTypes[]>(todosState);
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);

  const onModify = useCallback((): void => {
    setIsModal(true);
    setModifyContents(contents);
  }, [contents]);

  const onModifyTodo = useCallback((): void => {
    if (!modifyContents.trim()) {
      return;
    }

    setTodos(
      todos.map((todo: ITodoTypes) => {
        return todo.id === id ? { ...todo, contents: modifyContents } : todo;
      })
    );

    setIsModal(false);
  }, [id, modifyContents, setTodos, todos]);

  const onDelete = useCallback(async () => {
    await api.post(`todolist/delete`, { id: id });

    setTodos(todos.filter((todo: ITodoTypes) => todo.id !== id));
  }, [setTodos, todos]);

  return (
    <>
      <div className="flex justify-between items-center mb-3 pb-2  font-bold border-b border-slate-300">
        <div
          title={contents}
          className="text-black font-semibold"
          // onClick={() => onComplete(id)}
        >
          {contents}
        </div>

        <div className="flex">
          <FaPen className="bg-none cursor-pointer mr-2" onClick={onModify} />
          <MdClose
            className="bg-none font-semibold cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
      {isModal && (
        <TodoModal
          setIsModal={setIsModal}
          modifyContents={modifyContents}
          setModifyContents={setModifyContents}
          onModifyTodo={onModifyTodo}
        />
      )}
    </>
  );
};

export default TodoItem;
