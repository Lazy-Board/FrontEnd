import { myQuoteState, getQuotes } from "../../atom/quote";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { api } from "../../atom/signin";
import { useMutation, useQueryClient, useQuery } from "react-query";
import styled from "styled-components";

const Edit = styled.textarea`
  height: 120px;
  padding: 5px;
  resize: none;
  border-radius: 5px;
  transition: all 0.3s;
  &:focus {
    outline: none;
  }
`;

const EditModal = (): JSX.Element => {
  const queryClient = useQueryClient();
  const [userQuote, setUserQuote] = useRecoilState(myQuoteState);
  const { data: myQuote } = useQuery("userQuotes", getQuotes, {
    refetchOnWindowFocus: false,
  });

  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setUserQuote({ content: value });
  };

  useEffect(()=>{
    if (myQuote) {
      setUserQuote(myQuote)
    }
  },[myQuote])

  const saveQuoteMutation = useMutation((userQuote: string) =>
    api.post(`/userQuotes`, { content: userQuote })
  );

  const editQuoteMutation = useMutation((userQuote: string) =>
    api.put(`/userQuotes`, { content: userQuote })
  );

  const deleteQuoteMutation = useMutation(() =>
    api.delete(`/userQuotes`)
  );

  const saveText = async () => {
    try {
      if (!myQuote){
        const response = await saveQuoteMutation.mutateAsync(userQuote.content);
        setUserQuote(response.data);
      } else {
        const response = await editQuoteMutation.mutateAsync(userQuote.content);
        setUserQuote(response.data);
      }
      queryClient.invalidateQueries("userQuotes");
    } catch (error) {
      console.log(`Error: \n${error}`);
    }
  };

  const deleteText = async () => {
    try {
      await deleteQuoteMutation.mutateAsync();
      setUserQuote((prevMyQuote: any) => ({
        ...prevMyQuote,
        content: "",
      }));
      queryClient.invalidateQueries("userQuotes");
    } catch (error) {
      console.error(`Error: \n${error}`);
    }
  };

  return (
    <>
      <input type="checkbox" id="edit-modal" className="modal-toggle" />
      <div className="modal">
        <form className="modal-box w-96">
          <Edit
            className="w-full py-4 bg-stone-200 dark:bg-slate-700 focus:bg-stone-100 dark:focus:bg-slate-600"
            value={userQuote.content}
            onChange={changeText}
            placeholder="80자 이내로 당신의 명언을 적어주세요!"
            maxLength={80}
          />
          <div className="modal-action justify-center">
            <label
              htmlFor="edit-modal"
              className={`btn btn-primary ${
                userQuote.content === ""
                  ? "bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-200 cursor-not-allowed border-gray-300 dark:border-slate-600 hover:bg-gray-300"
                  : ""
              }`}
              onClick={saveText}
            >
              저장
            </label>
            <label
              htmlFor="edit-modal"
              className="btn btn-secondary"
              onClick={deleteText}
            >
              삭제
            </label>
            <label htmlFor="edit-modal" className="btn btn-outline">
              취소
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
