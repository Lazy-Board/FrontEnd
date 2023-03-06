import { useRecoilValueLoadable } from "recoil";

import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getNewsSelector, MainNewsList } from "../../atom/News";
import LoadingBar from "../Stock/Loading";
const NewsMainView = () => {
  const getNewsMain = useRecoilValueLoadable(getNewsSelector);

  let LoadablegetNewsList: MainNewsList[] = [];
  switch (getNewsMain.state) {
    case "hasValue":
      LoadablegetNewsList = getNewsMain.contents;
      break;
  }

  return (
    <div className="w-full h-fit max-h-72 mt-4 pb-6 relative border border-slate-300 rounded-lg overflow-auto scrollbar-hide bg-white">
      <div className="text-left flex font-semibold border-b border-slate-300 py-2 px-2 sticky top-0 w-full bg-white">
        헤드라인 뉴스
        <Link to="/news">
          <BiChevronRight size={26} />
        </Link>
      </div>

      <div className="flex-row text-sm px-3 bg-white">
        {getNewsMain.state === "loading" ? (
          <LoadingBar />
        ) : (
          LoadablegetNewsList.map((item: any) => (
            <div className="border-b flex text-left py-2 h-fit border-stone-300">
              <img
                src={item.imagePath}
                className={`${item.imagePath ? "w-28 mr-2" : "pl-1"}`}
              />
              <a href={`${item.url}`} target="_blank">
                <span className="">{item.subject}</span>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsMainView;
