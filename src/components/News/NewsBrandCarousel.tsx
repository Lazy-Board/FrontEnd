import { useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { NewsBrandList, selectNewsBrand } from "../../atom/News";
import { api } from "../../atom/signin";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import LoadingBar from "../Stock/Loading";

const NewsBrandCarouselMenu = () => {
  const NewsBrand = useRecoilValueLoadable(NewsBrandList);
  const [selectedNewsTitle, setSelectedNewsTitle] =
    useRecoilState(selectNewsBrand);
  // const NewsBrandList =
  //   useRecoilValueLoadable<selectedNewsListType[]>(selectedNewsList);

  let LoadableNewsBrand: String[] = [];

  switch (NewsBrand.state) {
    case "hasValue":
      LoadableNewsBrand = NewsBrand.contents;
      break;
  }

  const handleSelect = async (item: any) => {
    await api.put("/newsuser", { press1: item });
    setSelectedNewsTitle(item);
    location.reload();
  };

  const [translateX, setTranslateX] = useState(0);

  const handlePrevClick = () => {
    setTranslateX(translateX + 15);
  };

  const handleNextClick = () => {
    setTranslateX(translateX - 15);
  };
  return (
    <div className="mt-12 overflow-x-hidden">
      <div
        className="flex flex-nowrap"
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {NewsBrand.state === "loading" ? (
          <LoadingBar />
        ) : (
          LoadableNewsBrand.map((item, idx) => (
            <span
              onClick={() => handleSelect(item)}
              key={idx}
              className="min-w-fit w-1/4 overflow-h-hidden mx-2 p-2 cursor-pointer text-gray-600 border-2  border-slate-300 text-sm rounded-lg"
            >
              {item}
            </span>
          ))
        )}
      </div>
      <div className="flex justify-center text-center">
        <button onClick={handlePrevClick}>
          <BsFillArrowLeftCircleFill size={20} />
        </button>
        <button onClick={handleNextClick}>
          <BsFillArrowRightCircleFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default NewsBrandCarouselMenu;
