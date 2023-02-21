import styled from 'styled-components';
import DeleteModule from '../Buttons/DeleteModule';
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import { FiCrosshair } from 'react-icons/fi';
import WeatherBox from './WeatherBox'

const TodayTemp = styled.div`
    @media screen and (max-width: 410px) {
        text-align:left;
        span{
            display:block;
            margin-left:0;
        }
    }
`

const TodayData = styled.div`
    @media screen and (max-width: 410px) {
        margin-top:40px;
    }
`

//임시 데이터
const weatherData = 
    {
        "userId": "yoonyoonsung4@gmail.com",
        "cityName": "서초구",
        "locationName": "잠원동",
        "temperature": "6.0°",
        "effectiveTemperature": "4.2°",
        "highestTemperature": "-3°",
        "lowestTemperature": "10°",
        "weatherInformation": "비",
        "weatherComparison": "5.1° 높아요",
        "humidity": "60%",
        "ultraviolet": "좋음",
        "fineParticle": "좋음",
        "ultrafineParticle": "좋음",
        "windSpeed": "2.3m/s",
        "windDirection": "남풍",
        "updatedAt": "2023.02.10 00:12:30"
    }

const WeatherView = ():JSX.Element => {
    const { cityName, locationName, temperature, effectiveTemperature,
    highestTemperature, lowestTemperature, weatherInformation, weatherComparison, humidity,ultraviolet, fineParticle,ultrafineParticle, windSpeed, windDirection, updatedAt }
    = weatherData;

    const changeImg = 
    (weatherInformation.includes('비') ) ? 'heavy-rain'
    : (weatherInformation === '맑음') ? 'sun'
    : (weatherInformation === '눈') ? 'snow'
    : (weatherInformation === '안개') ? 'foggy'
    : (weatherInformation === '황사') ? 'sand'
    : (weatherInformation === '흐림') ? 'cloudy'
    : (weatherInformation === '우박') ? 'hail'
    : (weatherInformation === '번개') ? 'thunder'
    : 'moon'

    // 날씨 정보를 등록하지 않았을 시에 'OO님의 위치 정보를 등록해주세요!'
    // 랑 등록모달창 띄우는 버튼 출력해주기

    return (
        <div className="w-full h-fit mt-4 p-3 relative flex flex-wrap justify-between items-center border border-slate-300 rounded-lg bg-white">
            <DeleteModule />
            <TodayTemp>
                {/* 날씨 데이터/시간 따라서 이미지 변경되게 */}
                <p className="text-sm">
                    {cityName}&nbsp;{locationName}
                    <label htmlFor="location-modal" className='cursor-pointer'>
                        <FiCrosshair style={{display: 'inline-block', marginLeft:'4px'}}/>
                    </label>
                    <span className="ml-2 text-xs text-slate-400">
                        {updatedAt}
                    </span>
                </p>
                <div className="flex mt-1 items-baseline">
                    <img src={`/weatherImage/${changeImg}.png`} width={40} height={40} alt=""/>
                    <p className="text-5xl font-semibold">{temperature}</p>
                    <p className="text-base">
                        {highestTemperature} / {lowestTemperature}
                    </p>
                </div>
            </TodayTemp>
            <TodayData className="mt-6 text-right">
                <p className="text-sm">
                    어제보다&nbsp;
                    <span className='font-semibold'>{weatherComparison.split(' ')[0]}</span> 
                    {/* 높아요 면 Up, 낮아요 면 Down 으로 출력되도록 */}
                    {weatherComparison.includes('높아요') ? 
                    <TbArrowNarrowUp style={{display: 'inline-block'}}/>:
                    <TbArrowNarrowDown style={{display: 'inline-block'}}/>
                    }
                    / <span className='font-semibold'>{weatherInformation}</span>
                </p>
                <p className="mt-1 text-sm">
                    체감 <span className='font-semibold'>{effectiveTemperature}</span> / 
                    습도 <span className='font-semibold'>{humidity}</span>
                </p>
            </TodayData>
            <div className="w-full mt-4 flex justify-between">
                <WeatherBox status={fineParticle} dataName={'미세먼지'}/>
                <WeatherBox status={ultrafineParticle} dataName={'초미세먼지'}/>
                <WeatherBox status={ultraviolet} dataName={'자외선'}/>
                <WeatherBox status={windSpeed} dataName={`바람(${windDirection})`} speed={windSpeed}/>
            </div>
        </div>
    )
}

export default WeatherView;