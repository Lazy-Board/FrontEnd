import { FiEdit2 } from "react-icons/fi";
import { myQuoteState, getQuotes } from '../../atom/quote';
import { useRecoilValue } from 'recoil';

const DisplayMyQuote = (): JSX.Element => {
  const quote = useRecoilValue(myQuoteState);
  const myQuote = useRecoilValue(getQuotes)

  return (
    <div className="w-96 h-28 relative flex items-center justify-center ml-5 select-none">
      <p className={`max-w-xs mx-auto line-clamp-3 ${myQuote.content === '' && 'text-gray-400'}`}>
          {myQuote.content === '' ? '당신의 명언을 적어보세요!': myQuote.content}
      </p>
      <label htmlFor="edit-modal" className="absolute bottom-0 right-0 cursor-pointer">
          <FiEdit2 size={18} color="#999"/>
      </label>
  </div>
  );
};

export default DisplayMyQuote;
