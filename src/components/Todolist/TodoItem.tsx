import React, { useCallback, useState } from "react";
import { ITodoTypes } from "../../atom/Todo";
import { FaPen } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { SetterOrUpdater } from "recoil";
import TodoModal from "./TodoModal";

interface PropTypes {
  id: number;
  contents: string;
  isCompleted: boolean;

  onComplete: (id: number) => void;
  onDelete: (id: number) => void;

  todos: ITodoTypes[];
  setTodos: SetterOrUpdater<ITodoTypes[]>;
}

const TodoItem = ({
  id,
  contents,
  isCompleted,
  onComplete,
  onDelete,
  todos,
  setTodos,
}: PropTypes) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modifyContents, setModifyContents] = useState<string>("");

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

  return (
    <>
      <div className="flex justify-between items-center mb-3 pb-2  font-bold ">
        <div
          title={contents}
          className="text-black font-semibold"
          onClick={() => onComplete(id)}
        >
          {contents}
        </div>

        <div className="flex">
          <FaPen className="bg-none cursor-pointer mr-2" onClick={onModify} />
          <MdClose
            className="bg-none font-semibold cursor-pointer"
            onClick={() => onDelete(id)}
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
