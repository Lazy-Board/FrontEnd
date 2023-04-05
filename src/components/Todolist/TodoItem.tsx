import { useCallback, useState } from "react";
import { ITodoTypes, todosState } from "../../atom/Todo";
import { FaPen } from "react-icons/fa";
import { MdClose } from "react-icons/md";
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
      <div className="flex pb-2 font-bold border-b-slate-300 ">
        <div className="form-control">
          <label className="cursor-pointer label justify-start">
            <input
              type="checkbox"
              checked
              className="checkbox checkbox-success mr-2"
              onClick={onDelete}
            />
          </label>
        </div>
        <div
          title={contents}
          className="text-black text-sm p-2 mr-auto"
          // onClick={() => onComplete(id)}
        >
          {contents}
        </div>

        <div className="flex">
          <a href="#my-modal-2">
            <FaPen
              className="bg-none cursor-pointer mr-2 fill-primary mt-3"
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
