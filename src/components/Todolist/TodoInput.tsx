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
import { ErrorModal } from "../Modal/ErrorModal";

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
      if (value.length > 20) {
        alert("최대 20자까지 작성 가능합니다");
      }
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
    <div className="w-full flex justify-between items-center mt-1 py-1 border-none">
      <input
        type="text"
        className="w-full font-medium placeholder:text-zinc-400 dark:placeholder:text-slate-400 bg-zinc-200 dark:bg-slate-700 text-opacity-20 mr-3 border-2 border-zinc-300 dark:border-slate-600 rounded-lg text-base p-2"
        value={contents}
        onChange={onChange}
        placeholder="Todo를 입력해보세요!"
        onKeyDown={onKeyDown}
      />
      <button
        onClick={addTodo}
        className="bg-primary rounded-lg p-3 hover:bg-primary-focus transition-colors"
      >
        <FaPen className="bg-none text-white cursor-pointer w-5 h-5" />
      </button>
      {error && (
        <ErrorModal
          title="Error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default TodoInput;
