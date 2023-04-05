import { useRecoilValueLoadable } from "recoil";

import styled from "styled-components";
import { getNewsSelector, MainNewsList } from "../../atom/News";
import LoadingBar from "../Stock/Loading";
import DetailTopBar from "./DetailTopBar";
import NewsBrandCarouselMenu from "./NewsBrandCarousel";

const NewsDetailView = () => {
  const getNews = useRecoilValueLoadable(getNewsSelector);
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;

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
      <Content className="max-w-md bg-stone-100 p-3 pb-8">
        <NewsBrandCarouselMenu />
        <div className="max-h-screen overflow-auto scrollbar-hide">
          <div>
            {getNews.state === "loading" ? (
              <LoadingBar />
            ) : (
              LoadablegetNewsList.map((item: any, idx: number) => (
                <div
                  className="border-t flex text-left py-3  border-stone-300"
                  key={idx}
                >
                  <img
                    src={item.imagePath}
                    className={`${item.imagePath ? "w-28 mr-2" : "pl-1"}`}
                  />
                  <a href={`${item.url}`}>
                    <span>{item.subject}</span>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </Content>
    </>
  );
};
export default NewsDetailView;
