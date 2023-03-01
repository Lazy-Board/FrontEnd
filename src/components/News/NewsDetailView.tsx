import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillCaretDown } from "react-icons/ai";
import styled from "styled-components";
import {
  selectNewsBrand,
  getNewsSelector,
  MainNewsList,
  NewsBrandList,
} from "../../atom/News";
import DetailTopBar from "../MenuBars/DetailTopBar";
import { api } from "../../atom/signin";

const NewsDetailView = () => {
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;
  const [items, setItems] = useState(Array.from({ length: 10 }));
  const infinity = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 5 })));
    }, 1500);
  };
  const [selectedNewsTitle, setSelectedNewsTitle] =
    useRecoilState(selectNewsBrand);

  const NewsBrand = useRecoilValueLoadable(NewsBrandList);
  // const NewsBrandList =
  //   useRecoilValueLoadable<selectedNewsListType[]>(selectedNewsList);

  let LoadableNewsBrand: String[] = [];

  switch (NewsBrand.state) {
    case "hasValue":
      LoadableNewsBrand = NewsBrand.contents.map((item) => item);
      break;
    case "hasError":
      console.log(NewsBrand.contents.message);
      break;
    case "loading":
      return <progress className="progress w-56">Loading...</progress>;
  }

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

  const handleSelect = async (item: any) => {
    await api.put("/newsuser", { press1: item });
    setSelectedNewsTitle(item);
  };

  return (
    <>
      <DetailTopBar title="뉴스" />
      <Content className="max-w-md bg-stone-100 p-3 ">
        <div className="bg-white border-2 rounded-lg mt-12">
          <div className="dropdown flex justify-center">
            <label tabIndex={0} className="m-1 cursor-pointer flex px-2 ">
              {selectedNewsTitle === null ? "언론사 선택" : selectedNewsTitle}
              <AiFillCaretDown size={25} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 border"
            >
              {LoadableNewsBrand.map((item, idx) => (
                <button
                  onClick={() => handleSelect(item)}
                  key={idx}
                  className="my-2 cursor-pointer border-b border-b-stone-300"
                >
                  {item}
                </button>
              ))}
            </ul>
          </div>
          <div className="max-h-96">
            <InfiniteScroll
              dataLength={LoadablegetNewsList.length}
              hasMore={false}
              loader={<progress className="progress w-56">Loading...</progress>}
              next={infinity}
            >
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
            </InfiniteScroll>
          </div>
        </div>
      </Content>
    </>
  );
};

export default NewsDetailView;
