import { useRecoilValueLoadable } from "recoil";
import { useSliders } from "../../hooks/useSliders";
import { quotesList, QuoteType } from "../../atom/quote";
import DisplayMyQuote from "./DisplayMyQuote";
import Loading from "./Loading";
import styled from "styled-components";

const LongWidth = styled.div`
  width: 200%;
  position: relative;
  display: flex;
  left: 0;
`;

const QuoteView = (): JSX.Element => {
  const quoteLoadable = useRecoilValueLoadable(quotesList);
  let lists: QuoteType =
    "hasValue" === quoteLoadable.state
      ? quoteLoadable.contents
      : { content: "", writer: "" };

  const { slideRef, dotRef, NextSlide, PrevSlide } = useSliders();

  const dots = [
    {
      id: 1,
      class: "w-3 h-3 mr-2 rounded-full bg-gray-500/50 transition-colors",
      move: NextSlide,
    },
    {
      id: 2,
      class: "w-3 h-3 rounded-full bg-gray-500/50 transition-colors",
      move: PrevSlide,
    },
  ];

  return (
    <div className="w-full h-40 mt-5 p-3 relative flex flex-wrap justify-between items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
      <div className="absolute flex top-3 left-2 z-30">
        {dots.map((dot) => (
          <button
            type="button"
            className={dot.class}
            key={dot.id}
            onClick={dot.move}
            ref={(elem) => (dotRef.current[dot.id - 1] = elem)}
          ></button>
        ))}
      </div>
      <LongWidth ref={slideRef}>
        {quoteLoadable.state === "loading" ? (
          <Loading />
        ) : (
          <div className="w-96 h-28 relative flex flex-col items-center justify-center pl-6 select-none">
            <p className="max-w-xs mx-auto line-clamp-3 text-center">{lists.content}</p>
            <p className="mt-2 text-gray-500 text-center">-{lists.writer}</p>
          </div>
        )}
        <DisplayMyQuote />
      </LongWidth>
    </div>
  );
};

export default QuoteView;
