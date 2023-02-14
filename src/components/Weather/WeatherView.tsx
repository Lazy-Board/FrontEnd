import styled, { css } from 'styled-components';
import DeleteModule from '../Buttons/DeleteModule';
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import { FiCrosshair } from 'react-icons/fi';

// 추후 라이브러리 설치해서 이동 및 추가/삭제 가능하게 만들기
// X 버튼을 checkbox로 해서 checked면 보이게 아니면 안보이게..하면 될것 같기도 하고(방법 고민해보기)
// styled-components 타입 정리하기

//상태에 따른 Box 배경색/선 색상 정의
const badBgc = '#ffe0de';
const badColor = "#ad1c15"
const normalBgc = '#ebfae8';
const normalColor = '#5a9c5a';
const goodBgc = '#ebf7ff';
const goodColor = '#2552ba';

const Boxes:any = styled.div`
    width: calc(25% - 6px);
    ${(props:any) => 
        (props.status === '나쁨') ? css`
            background-color:${badBgc};
            border-color:${badColor};
            color:${badColor};
            `
        : (props.status === '보통') ? css`
            background-color:${normalBgc};
            border-color:${normalColor};
            color:${normalColor};
            `
        : (props.status === '좋음') ? css`
            background-color:${goodBgc};
            border-color:${goodColor};
            color:${goodColor};
            `
        : css`background-color:transparent;`
    }
`

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
    //임시 데이터
    const weatherData = [
        {id:1,name:'미세먼지', status:'나쁨'},
        {id:2,name:'초미세먼지', status:'보통'},
        {id:3,name:'자외선', status:'좋음'},
        {id:4,name:'바람(서풍)', status:'2.8m/s'},
    ]

    return (
        <div className="w-full h-fit mt-4 p-3 relative flex flex-wrap justify-between items-center border border-slate-300 rounded-lg bg-white">
            <DeleteModule />
            <TodayTemp>
                {/* 날씨 데이터/시간 따라서 이미지 변경되게 */}
                <p className="text-sm">
                    {`강서구 방화동`}
                    <label htmlFor="location-modal" className='cursor-pointer'>
                        <FiCrosshair style={{display: 'inline-block', marginLeft:'4px'}}/>
                    </label>
                    <span className="ml-2 text-xs text-slate-400">
                        {`2023.02.08 15:00`}
                    </span>
                </p>
                <div className="flex mt-1 items-baseline">
                    <img src={`/weatherImage/sun-cloud.png`} width={40} height={40} alt=""/>
                    <p className="text-5xl font-semibold">{`5`}°</p>
                    <p className="text-base">{`5°`} / {`-1°`}</p>
                </div>
            </TodayTemp>
            <TodayData className="mt-5 text-right">
                <p className="text-sm">
                    어제보다 
                    <span className='font-semibold'>{` 3.4°`}</span> 
                    {/* 높아요 면 Up, 낮아요 면 Down 으로 출력되도록 추후 변경 */}
                    <TbArrowNarrowUp style={{display: 'inline-block'}}/>
                    {/* <TbArrowNarrowDown style={{display: 'inline-block'}}/> */}
                    / <span className='font-semibold'>{`맑음`}</span>
                </p>
                <p className="mt-1 text-sm">
                    체감 <span className='font-semibold'>{`4.4°`}</span> / 
                    습도 <span className='font-semibold'>{`47%`}</span>
                </p>
            </TodayData>
            <div className="w-full mt-4 flex justify-between">
                {weatherData.map((data)=>(
                    <Boxes status={data.status} 
                    className="p-2 border border-slate-300 rounded-lg" 
                    key={data.id}
                    >
                        <p className="text-xs">{data.name}</p>
                        <p className="mt-1 text-sm font-semibold">{data.status}</p>
                    </Boxes>
                ))}
            </div>
        </div>
    )
}

export default WeatherView;