import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectNewsBrand,
  selectedNewsData,
  getNewsSelector,
} from "../atom/News";

const NewsDetailView = () => {
  const [selectedNewsTitle, setSelectedNews] = useRecoilState(selectNewsBrand);
  const [selectedNewsList, setSelectedNewsList] =
    useRecoilState(selectedNewsData);
  const data = useRecoilValue(getNewsSelector);
  const newsBrandList = ["국민일보", "네이버뉴스", "구글뉴스", "네이버스포츠"];

  const handleSelect = (item: any) => {
    setSelectedNews(item);
  };

  let filteredList = [];
  filteredList = data.filter((item: any) => item.title === selectedNewsList);
  console.log(filteredList);

  useEffect(() => {}, [selectedNewsTitle]);
  return (
    <div className="dropdown dropdown-right">
      <label tabIndex={0} className="m-1 cursor-pointer">
        {selectedNewsTitle}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {newsBrandList.map((item) => (
          <button type="button" onClick={() => handleSelect(item)}>
            {item}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default NewsDetailView;
