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
            className="w-full py-4"
            value={userQuote.content}
            onChange={changeText}
            placeholder="80??? ????????? ????????? ????????? ???????????????!"
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
              onClick={saveText}
            >
              ??????
            </label>
            <label
              htmlFor="edit-modal"
              className="btn btn-secondary"
              onClick={deleteText}
            >
              ??????
            </label>
            <label htmlFor="edit-modal" className="btn btn-outline">
              ??????
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
