import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AiFillCaretDown } from "react-icons/ai";
import styled from "styled-components";
import {
  selectNewsBrand,
  selectedNewsData,
  getNewsSelector,
} from "../../atom/News";
import DetailTopBar from "../MenuBars/DetailTopBar";

const NewsDetailView = () => {
  const newsBrandList = ["국민일보", "네이버뉴스", "구글뉴스", "네이버스포츠"];
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;
  const [selectedNewsTitle, setSelectedNews] = useRecoilState(selectNewsBrand);
  const [selectedNewsList, setSelectedNewsList] =
    useRecoilState(selectedNewsData);
  const data = useRecoilValue(getNewsSelector);

  const handleSelect = (item: any) => {
    setSelectedNews(item);
  };

  let filteredList = data.filter(
    (item: any) => item.brand === selectedNewsTitle
  );
  console.log(filteredList);

  useEffect(() => {
    console.log(selectedNewsTitle);
  }, [selectedNewsTitle]);

  return (
    <>
      <DetailTopBar title="뉴스" />
      <Content className="max-w-md bg-stone-100 p-3">
        <div className="bg-white border-2 rounded-lg mt-12">
          <div className="dropdown flex justify-center">
            <label tabIndex={0} className="m-1 cursor-pointer flex px-2">
              {selectedNewsTitle === null ? "언론사 선택" : selectedNewsTitle}
              <AiFillCaretDown size={25} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 border"
            >
              {newsBrandList.map((item) => (
                <button
                  onClick={() => handleSelect(item)}
                  key={item}
                  className="my-2 cursor-pointer border-b border-b-stone-300"
                >
                  {item}
                </button>
              ))}
            </ul>
          </div>

          <div className="">
            {filteredList.map((item: any, idx: number) => (
              <div
                className="border-t flex text-left py-3 h-fit border-stone-300"
                key={idx}
              >
                <img
                  src={item.urlToImage}
                  className={`${item.urlToImage ? "w-28 mr-2" : "pl-1"}`}
                />
                <a href={`${item.url}`}>
                  <span>{item.title}</span>
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
