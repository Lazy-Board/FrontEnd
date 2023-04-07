import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { getNewsSelector, MainNewsList } from "../../atom/News";
import MainLoading from "../MenuBars/MainLoading";
import DetailTopBar from "../MenuBars/DetailTopBar";
import NewsBrandCarouselMenu from "./NewsBrandCarousel";

const Thumbnail = styled.img`
  min-width:112px;
`
const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;

const NewsDetailView = () => {
  const getNews = useRecoilValueLoadable(getNewsSelector);

  // const selectNewsLoadable = useRecoilValueLoadable(selectNews);

  let LoadablegetNewsList: MainNewsList[] = [];
  switch (getNews.state) {
    case "hasValue":
      LoadablegetNewsList = getNews.contents;
      break;
  }

  return (
    <>
      <DetailTopBar title="뉴스" />
      <Content className="max-w-md bg-stone-100 dark:bg-neutral dark:text-slate-100 pt-5 px-3 pb-16">
        <NewsBrandCarouselMenu />
        <div className="mt-2 mb-1">
            {getNews.state === "loading" ? (
              <MainLoading />
            ) : (
              LoadablegetNewsList.map((item: any, idx: number) => (
                <div
                  className={`flex text-left py-3 border-slate-300 dark:border-slate-600 ${idx !== 0 && 'border-t'}`}
                  key={idx}
                >
                  {!item.imagePath ? <></> : 
                    <a href={`${item.url}`}>
                      <Thumbnail
                      src={item.imagePath}
                      className="w-28 h-16 mr-2 object-cover"
                    />
                    </a>
                  }
                  <a href={`${item.url}`}>
                    <span>{item.subject}</span>
                  </a>
                </div>
              ))
            )}
          </div>
      </Content>
    </>
  );
};
export default NewsDetailView;
