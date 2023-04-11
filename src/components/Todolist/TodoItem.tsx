import { useCallback, useState } from "react";
import { ITodoTypes, todosState } from "../../atom/Todo";
import { FaPen } from "react-icons/fa";
import TodoModal from "./TodoModal";
import { api } from "../../atom/signin";
import { useRecoilState } from "recoil";

interface PropTypes {
  id: number;
  contents: string;
  // isCompleted: boolean;
  // onComplete: (id: number) => void;
}

const TodoItem = ({ id, contents }: PropTypes) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modifyContents, setModifyContents] = useState<string>("");
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);

  const onModify = useCallback((): void => {
    setIsModal(true);
    setModifyContents(contents);
  }, [contents]);

  const onModifyTodo = useCallback(async () => {
    api.put("/todolist/update", {
      content: modifyContents,
      id: id,
    });

    // [...todos, { content: modifyContents, id: id } : todos]
    setTodos(
      todos.map((todo: ITodoTypes) => {
        return todo.id === id ? { ...todo, content: modifyContents } : todo;
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
      <div className="flex py-1 items-center border-b border-slate-300 dark:border-slate-600">
        <div className="form-control">
          <label className="cursor-pointer label justify-start">
            <input
              type="checkbox"
              checked
              className="checkbox checkbox-success"
              onClick={onDelete}
            />
          </label>
        </div>
        <p
          title={contents}
          className="text-stone-800 dark:text-slate-100 text-sm p-2 mr-auto"
        >
          {contents}
        </p>

        <div className="flex">
          <a href="#my-modal-2">
            <FaPen
              className="bg-none cursor-pointer mr-2 text-slate-400"
              onClick={onModify}
            />
          </a>
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
