import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
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
    <div className="modal" id="my-modal-2">
        <div className="modal-box w-96 dark:text-slate-100">
        <div
            className="btn btn-sm btn-circle absolute right-2 top-2 bg-slate-400 bg-opacity-50 border-none"
            onClick={onCloseModal}
          >
            <IoMdClose size={20}/>
          </div>
          <div className="flex mb-3 mt-4 justify-center">
            <h3 className="font-bold text-lg">To-Do 수정하기</h3>
            <FaPen className="mt-2 w-6 bg-none" />
          </div>
          <div className="flex grow flex-col justify-center items-center">
            <input
              type="text"
              className="mb-4 p-2 border border-slate-300 w-full mt-6 text-base rounded-lg"
              value={modifyContents}
              onChange={onChange}
              placeholder="Todo"
            />
            <div className="modal-action">
              <button
                className="w-fit h-fit outline-none border-none text-base cursor-pointer btn btn-primary"
                onClick={onModifyTodo}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TodoModal;
