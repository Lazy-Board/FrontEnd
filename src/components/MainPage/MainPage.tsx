import styled from "styled-components";
import QuoteView from "../Quote/QuoteView";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;

const MainPage = (): JSX.Element => {
  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      {/* 여기에 위젯 컴포넌트들이.. */}
      <QuoteView />
    </Content>
  );
};

export default MainPage;
