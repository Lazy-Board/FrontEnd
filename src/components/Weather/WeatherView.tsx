import styled from 'styled-components';
import DeleteModule from '../Buttons/DeleteModule';
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import { useQuery } from 'react-query';
import { FiCrosshair } from 'react-icons/fi';
import { getWeather } from '../../atom/weather';
import WeatherBox from './WeatherBox'
import WeatherLoading from './WeatherLoading'

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

    const { cityName, locationName, temperature, effectiveTemperature,
    highestTemperature, lowestTemperature, weatherInformation, weatherComparison, humidity,ultraviolet, fineParticle,ultrafineParticle, windSpeed, windDirection, updatedAt }
    = weatherData || {};

    const changeImg = 
    (weatherData && weatherInformation.includes('비') ) ? 'heavy-rain'
    : (weatherData && weatherInformation.includes('맑음')) ? 'sun'
    : (weatherData && weatherInformation.includes('눈')) ? 'snow'
    : (weatherData && weatherInformation.includes('안개')) ? 'foggy'
    : (weatherData && weatherInformation.includes('황사')) ? 'sand'
    : (weatherData && weatherInformation.includes('흐림')) ? 'cloudy'
    : (weatherData && weatherInformation.includes('우박')) ? 'hail'
    : (weatherData && weatherInformation.includes('번개')) ? 'thunder'
    : 'moon'

    return (
        <div className="w-full h-fit mt-4 p-3 relative flex flex-wrap justify-between items-center border border-slate-300 rounded-lg bg-white">
            <DeleteModule />
            {isFetching ? <WeatherLoading />:
            !weatherData ? 
            <div className='w-full h-32 mt-6 p-4' >
                <p>아직 날씨 지역을 설정하지 않으셨어요!</p>
                <label htmlFor="location-modal"
                className='btn btn-primary mt-4 cursor-pointer'
                >날씨 지역 설정하기</label>
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
            </>
            }
        </div>
    )
}

export default WeatherView;