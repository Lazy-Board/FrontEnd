import styled from 'styled-components';
import { useQuery } from 'react-query';
import { FiCrosshair } from 'react-icons/fi';
import { getWeather } from '../../atom/weather';
import WeatherBox from './WeatherBox';
import WeatherInfo from './WeatherInfo';
import WidgetLoading from '../Modal/WidgetLoading';

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

const WeatherView = ():JSX.Element => {
    const { data:weatherData, isFetching } = useQuery(['weatherData'], getWeather, {
        refetchOnWindowFocus:false,
        staleTime:Infinity,
    })

    const { cityName, locationName, icon, weatherId, temperature, effectiveTemperature, highestTemperature, lowestTemperature, humidity, pressure, windSpeed,  updatedAt } = weatherData || {};

    return (
        <div className="w-full h-fit p-3 relative flex flex-wrap justify-between items-center border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-neutral">
            {isFetching ? <WidgetLoading />:
            !weatherData ? 
            <div className='w-full h-32 mt-6 p-4 text-center' >
                <p>아직 날씨 위치를 설정하지 않으셨어요!</p>
                <label htmlFor="location-modal"
                className='btn btn-primary mt-4 cursor-pointer'
                >날씨 위치 설정하기</label>
            </div> 
            :<>
            <TodayTemp>
                <p className="text-sm">
                    {cityName}&nbsp;{locationName}
                    <label htmlFor="location-modal" className='cursor-pointer'>
                        <FiCrosshair style={{display: 'inline-block', marginLeft:'4px'}}/>
                    </label>
                    <span className="ml-2 text-xs text-slate-400">
                        {updatedAt}
                    </span>
                </p>
                <div className="flex mt-1 items-center">
                    <img src={`/icons/${icon}.png`} width={40} height={40} alt="" className='mr-1 object-contain'/>
                    <p className="text-5xl font-semibold">
                        {Number(temperature).toFixed(1)}°
                    </p>
                    <p className="text-sm self-end">
                        {Number(highestTemperature).toFixed(1)}° /&nbsp;
                        {Number(lowestTemperature).toFixed(1)}°
                    </p>
                </div>
            </TodayTemp>
            <TodayData className="mt-6 text-right">
                <WeatherInfo weatherId={weatherId}/>
                <p className="text-sm">
                    체감 온도 {Number(effectiveTemperature).toFixed(1)}°
                </p>
            </TodayData>
            <div className="w-full mt-4 flex justify-between">
                <WeatherBox status={pressure} dataName={'기압'}/>
                <WeatherBox status={humidity} dataName={'습도'}/>
                <WeatherBox status={windSpeed} dataName={`바람`} />
            </div>
            </>
            }
        </div>
    )
}

export default WeatherView;