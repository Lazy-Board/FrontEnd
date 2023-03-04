import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
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
      {/* <div className="w-full px-3 h-2/5 outline-none bg-stone-200 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col">
        <div className="absolute right-2" onClick={onCloseModal}>
          X
        </div>
        <div className="flex mb-3 mt-4 justify-center">
          <div className="mr-2 text-2xl ml-2 font-bold">Todo 수정하기</div>
          <FaPen className="mt-2 w-6 bg-none" />
        </div>

        <div className="flex grow flex-col justify-center items-center">
          <input
            type="text"
            className="mb-4 border-black w-1/3 mt-16 text-xl"
            value={modifyContents}
            onChange={onChange}
            placeholder="Todo"
          />

          <button
            className="w-1/3 h-16 outline-none border-none bg-white text-xl cursor-pointer font-bold"
            onClick={onModifyTodo}
          >
            수정하기
          </button>
        </div>
      </div> */}
      <div className="modal" id="my-modal-2">
        <div className="modal-box w-2/5">
          <div
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onCloseModal}
          >
            X
          </div>
          <div className="flex mb-3 mt-4 justify-center">
            <h3 className="font-bold text-lg">To-Do 수정하기</h3>
            <FaPen className="mt-2 w-6 bg-none" />
          </div>
          <div className="flex grow flex-col justify-center items-center">
            <input
              type="text"
              className="mb-4 p-2 border border-slate-300 w-full mt-16 text-xl rounded-lg"
              value={modifyContents}
              onChange={onChange}
              placeholder="Todo"
            />
            <div className="modal-action">
              <button
                className="w-fit h-fit outline-none border-none text-xl cursor-pointer btn btn-primary"
                onClick={onModifyTodo}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default TodoModal;
