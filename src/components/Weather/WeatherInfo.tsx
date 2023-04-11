import weatherDescKo from "./weatherDescKo";

interface WeatherComponentProps {
    weatherId: number;
}

const WeatherInfo: React.FC<WeatherComponentProps> = ({ weatherId }) => {
  // weatherId에 대응하는 weatherDescKo 값을 찾아서 출력
    const getWeatherDesc = (id: number): string => {
    const weatherObj = weatherDescKo.find(obj => obj.hasOwnProperty(id));
        if (weatherObj) {
            return weatherObj[id];
        } else {
            return '날씨 정보 없음';
        }
    };

    return (
        <p className='mt-1 text-sm'>
            {getWeatherDesc(weatherId)}
        </p>
    );
};

export default WeatherInfo;