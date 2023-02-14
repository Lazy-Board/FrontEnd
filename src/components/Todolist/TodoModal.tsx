import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { FaPen } from "react-icons/fa";

interface PropTypes {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  modifyContents: string;
  setModifyContents: Dispatch<SetStateAction<string>>;
  onModifyTodo: () => void;
}

const TodoModal = ({
  setIsModal,
  modifyContents,
  setModifyContents,
  onModifyTodo,
}: PropTypes) => {
  const onCloseModal = useCallback((): void => {
    setIsModal(false);
  }, [setIsModal]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setModifyContents(value);
    },
    [setModifyContents]
  );

  return (
    <>
      <div className="w-2/5 h-2/5 outline-none bg-blue-400 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col">
        <div className="absolute right-2" onClick={onCloseModal}>
          X
        </div>
        <div className="flex mb-3 mt-4 justify-center">
          <div className="mr-2 text-2xl ml-2">Todo 수정하기</div>
          <FaPen className="mt-2 w-6" />
        </div>

        <div className="flex grow flex-col justify-center items-center">
          <input
            type="text"
            className="mb-4 border-black w-1/3 mt-16 text-xl"
            value={modifyContents}
            onChange={onChange}
            placeholder="Todo 입력"
          />

          <button
            className="w-1/3 h-16 outline-none border-none bg-white text-xl cursor-pointer text-blue-400 font-bold"
            onClick={onModifyTodo}
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoModal;
