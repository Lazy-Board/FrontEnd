import axios from "axios";
import React, {
  ChangeEvent,
  useCallback,
  KeyboardEvent,
  FormEvent,
} from "react";

import { FaPen } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { api } from "../../atom/signin";
import {
  inputState,
  todosState,
  ITodoTypes,
  todoSelector,
} from "../../atom/Todo";

const TodoInput = () => {
  const [contents, setContents] = useRecoilState<string>(inputState);

  const todos = useRecoilValue<ITodoTypes[]>(todoSelector);
  const setTodos = useSetRecoilState<ITodoTypes[]>(todosState);

  // useRecoilValue = get 변수
  // useSetRecoilState = setter 지정
  // 위와 같은형식으로 get과 setter를 분리하여 사용하는 방법도 있습니다.
  const addTodo = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const res = await api.post("/todolist/write", { content: contents });
      setTodos([...todos, res.data]);
      setContents("");
      if (!contents.trim()) {
        // 빈칸 입력 방지
        return;
      }
    },
    [contents, setContents, setTodos, todos]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
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
    <div className="w-full flex justify-between items-center py-1">
      <input
        type="text"
        className="border-black  bg-stone-400 px-1 py-1 font-semibold placeholder:text-black mr-3"
        value={contents}
        onChange={onChange}
        placeholder="Todo를 입력해보세요!"
        onKeyDown={onKeyDown}
      />
      <FaPen className="bg-none cursor-pointer w-8 h-8" onClick={addTodo} />
    </div>
  );
};

export default TodoInput;
