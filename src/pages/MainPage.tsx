import styled from 'styled-components';
import WeatherView from '../components/Weather/WeatherView';

const Content = styled.div`
    min-height: 100vh;
    margin:0 auto;
    color: black;
    `;

const MainPage = ():JSX.Element => {
    return (
        <Content className="max-w-md bg-stone-100 p-3">
            {/* 여기에 위젯 컴포넌트들이.. */}
            <WeatherView />
        </Content>
    )
}

export default MainPage;