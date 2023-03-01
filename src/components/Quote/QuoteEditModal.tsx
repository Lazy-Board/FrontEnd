import { myQuoteState, getQuotes } from "../../atom/quote";
import { useRecoilState } from "recoil";
import { api } from "../../atom/signin";
import { useMutation, useQueryClient, useQuery } from "react-query";
import styled from "styled-components";

const Edit = styled.textarea`
  height: 120px;
  padding: 5px;
  resize: none;
  border-radius: 5px;
  transition: all 0.3s;
  background-color: #f5f5f5;
  &:focus {
    outline: none;
    background-color: #eee;
  }
`;

const EditModal = (): JSX.Element => {
  const [userQuote, setUserQuote] = useRecoilState(myQuoteState);
  const queryClient = useQueryClient();
  const { data: myQuote } = useQuery("userQuotes", getQuotes, {
    refetchOnWindowFocus: false,
  });

  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setUserQuote({ content: value });
  };

  const saveQuoteMutation = useMutation((userQuote: string) =>
    api.post(`/userQuotes`, { content: userQuote })
  );

  const editQuoteMutation = useMutation((userQuote: string) =>
    api.put(`/userQuotes`, { content: userQuote })
  );

  // json-server 404에러 문제: id 추가하고 구조를 배열로 바꿔야만 작동한다.....json server에서 받는 구조상 어쩔수 없는거 같음
  // 실제 api에서 동작하는거 보고서 봐야할거 같음..
  const deleteQuoteMutation = useMutation(() =>
    api.delete(`/userQuotes`)
  );

  const saveText = async () => {
    try {
      const response = await saveQuoteMutation.mutateAsync(userQuote.content);
      setUserQuote(response.data);
      queryClient.invalidateQueries("userQuotes");
    } catch (error) {
      console.log(`Error: \n${error}`);
    }
  };

  const editText = async () => {
    try {
      const response = await editQuoteMutation.mutateAsync(userQuote.content);
      setUserQuote(response.data);
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
            className="w-full py-4"
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
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300 hover:bg-gray-300"
                  : ""
              }`}
              onClick={!myQuote?.content || myQuote?.content==="string" ? saveText : editText}
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
