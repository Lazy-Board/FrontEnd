import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getNewsSelector } from "./atom/News";
const NewsMainView = () => {
  const data = useRecoilValue(getNewsSelector);
  const Content = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    color: black;
  `;

  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      <div className="w-full h-fit mt-5 p-3 pt-2 pb-6 relative border border-slate-300 rounded-lg overflow-hidden bg-white">
        <div className="text-left font-semibold">헤드라인 뉴스</div>

        <ul>
          {data.map((item: any) => (
            <li>
              <p className="text-sm">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </Content>
  );
};

export default NewsMainView;
