import { useRecoilValueLoadable } from "recoil";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getNewsSelector, MainNewsList } from "../../atom/News";
import WidgetLoading from "../Modal/WidgetLoading";
import styled from "styled-components";

const Thumbnail = styled.img`
  min-width:112px;
`

const NewsMainView = () => {
  const getNewsMain = useRecoilValueLoadable(getNewsSelector);

  let LoadablegetNewsList: MainNewsList[] = [];
  switch (getNewsMain.state) {
    case "hasValue":
      LoadablegetNewsList = getNewsMain.contents;
      break;
  }

  return (
    <div className="w-full h-fit max-h-64 pb-6 relative border border-slate-300 dark:border-slate-600 rounded-lg overflow-auto scrollbar-hide bg-white dark:bg-neutral">
      <div className="text-left flex item-center border-b border-slate-300 dark:border-slate-600 py-2 px-2 sticky top-0 w-full bg-white dark:bg-neutral">
        헤드라인 뉴스
        <Link to="/news">
          <BiChevronRight size={24} />
        </Link>
      </div>

      <div className="flex-row text-sm px-3 bg-white dark:bg-neutral">
        {getNewsMain.state === "loading" ? (
          <WidgetLoading />
        ) : (
          LoadablegetNewsList.map((item: any, index:any) => (
            <div className={`flex text-left py-2 h-fit border-stone-300 dark:border-slate-600 ${index === LoadablegetNewsList.length - 1 ? 'pb-0' : 'border-b'}`} key={index}>
              {!item.imagePath ? <></> : 
                <a href={`${item.url}`} target="_blank" rel="noopener noreferrer">
                <Thumbnail
                src={item.imagePath}
                className="w-28 h-16 mr-2 object-cover"
                />
                </a>
              }
              <a href={`${item.url}`} target="_blank" rel="noopener noreferrer" >
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
