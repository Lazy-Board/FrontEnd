import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getNewsSelector, MainNewsList } from "../../atom/News";
const NewsMainView = () => {
  const getNewsMain = useRecoilValueLoadable(getNewsSelector);

  let LoadablegetNewsList: MainNewsList[] = [];
  switch (getNewsMain.state) {
    case "hasValue":
      LoadablegetNewsList = getNewsMain.contents;
      break;
    case "hasError":
      console.log(getNewsMain.contents.message);
      break;
    case "loading":
      return <progress className="progress w-56">Loading...</progress>;
  }

  return (
    <div className="w-full h-fit max-h-80 mt-5 p-3 pt-2 pb-6 relative border rounded-lg overflow-hidden bg-white">
      <div className="text-left flex font-semibold border-b border-slate-300 pb-2">
        헤드라인 뉴스
        <Link to="/news">
          <BiChevronRight size={26} />
        </Link>
      </div>

      <div className="flex-row text-sm">
        {LoadablegetNewsList.map((item: any) => (
          <div className="border-b flex text-left py-2 h-fit border-stone-300">
            <img
              src={item.imagePath}
              className={`${item.imagePath ? "w-28 mr-2" : "pl-1"}`}
            />
            <a href={`${item.url}`} target="_blank">
              <span className="">{item.subject}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsMainView;
