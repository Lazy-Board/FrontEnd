import { useRecoilValueLoadable } from "recoil";

import styled from "styled-components";
import { getNewsSelector, MainNewsList } from "../../atom/News";
import DetailTopBar from "./DetailTopBar";
import NewsBrandCarouselMenu from "./NewsBrandCarousel";

const NewsDetailView = () => {
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;

  // const selectNewsLoadable = useRecoilValueLoadable(selectNews);

  const getNews = useRecoilValueLoadable(getNewsSelector);

  let LoadablegetNewsList: MainNewsList[] = [];
  switch (getNews.state) {
    case "hasValue":
      LoadablegetNewsList = getNews.contents;
      break;
    case "hasError":
      console.log(getNews.contents.message);
      break;
    case "loading":
      return <progress className="progress w-56">Loading...</progress>;
  }

  // let filteredList: MainNewsList[] = LoadablegetNewsList.filter(
  //   (item: MainNewsList) => item.pressName === selectedNewsTitle
  // );

  return (
    <>
      <DetailTopBar title="뉴스" />
      <Content className="max-w-md bg-stone-100 p-3">
        {/* <div className="dropdown flex justify-center">
            <label tabIndex={0} className="m-1 cursor-pointer flex px-2 ">
              {selectedNewsTitle === null ? "언론사 선택" : selectedNewsTitle}
              <AiFillCaretDown size={25} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 border"
            > */}
        <NewsBrandCarouselMenu />
        <div className="max-h-screen overflow-auto mt-2">
          <div className="mt-2">
            {LoadablegetNewsList.map((item: any, idx: number) => (
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
            ))}
          </div>
        </div>
      </Content>
    </>
  );
};
export default NewsDetailView;
