import { FiEdit2 } from "react-icons/fi";
import { getQuotes } from "../../atom/quote";
import { useQuery } from "react-query";
import WidgetLoading from "../Modal/WidgetLoading";
import styled from "styled-components";

const Text=styled.p`
  width:max-content;
  word-break: break-all;
`

const DisplayMyQuote = (): JSX.Element => {
  const { data: myQuote, isFetching } = useQuery("userQuotes", getQuotes, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isFetching ? (
        <div className="w-96 pl-16">
            <WidgetLoading />
        </div>
      ) : (
        <div className="w-96 h-28 relative flex items-center justify-center ml-5 select-none">
          <Text
            className={`max-w-xs mx-auto text-center line-clamp-3 ${
              !myQuote?.content && "text-gray-400"
            }`}
          >
            {myQuote?.content || "당신의 명언을 적어보세요!"}
          </Text>
          <label
            htmlFor="edit-modal"
            className="absolute bottom-0 right-0 cursor-pointer"
          >
            <FiEdit2
              size={18}
              className="text-gray-400 hover:text-green-500 transition-colors"
            />
          </label>
        </div>
      )}
    </>
  );
};

export default DisplayMyQuote;
