import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getNewsSelector } from "../../atom/News";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
const NewsMainView = () => {
  const data = useRecoilValue(getNewsSelector);
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;

  return (
    <div className="w-full mt-5 h-fit p-3 pt-2 pb-6 relative border rounded-lg overflow-hidden bg-white">
      <div className="text-left flex font-semibold border-b border-black pb-2">
        헤드라인 뉴스
        {/* <Link to={`/news`}> */}
        <BiChevronRight size={26} /> {/* </Link> */}
      </div>

      <div className="flex-row text-sm">
        {data.map((item: any, i: number) => (
          <div
            className="border-b flex text-left py-3 h-fit border-stone-300"
            key={i}
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
  );
};

export default NewsMainView;
