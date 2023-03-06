import {
  ChangeEvent,
  useCallback,
  KeyboardEvent,
  FormEvent,
  useState,
} from "react";

import { FaPen } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { api } from "../../atom/signin";
import { inputState, todosState, ITodoTypes } from "../../atom/Todo";
import { Modal } from "../Modal/ErrorModal";

const TodoInput = () => {
  const [contents, setContents] = useRecoilState<string>(inputState);

  const todos = useRecoilValue<ITodoTypes[]>(todosState);
  const setTodos = useSetRecoilState<ITodoTypes[]>(todosState);
  const [error, setError] = useState(null);
  const addTodo = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const res = await api.post("/todolist/write", { content: contents });
        if (todos.length < 3) {
          setTodos([...todos, res.data]);
          setContents("");
        } else {
          alert("todolist는 최대 3개까지 설정 가능합니다");
        }
      } catch (err: any) {
        setError(err.response.data.msg);
      }
    },
    [contents, setContents, todos]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setContents(value);
    },
    [setContents]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        addTodo(e);
      }
    },
    [addTodo]
  );

  return (
    <div className="w-full flex justify-between items-center py-1 border-none">
      <input
        type="text"
        className="w-full font-medium placeholder:text-slate-300 text-opacity-20 mr-3 border-2 border-slate-300 rounded-lg text-base p-2"
        value={contents}
        onChange={onChange}
        placeholder="Todo를 입력해보세요!"
        onKeyDown={onKeyDown}
      />
      <FaPen
        className="bg-none fill-primary cursor-pointer w-5 h-5"
        onClick={addTodo}
      />
      {error && (
        <Modal title="Error" message={error} onClose={() => setError(null)} />
      )}
    </div>
  );
};

export default TodoInput;
