import styled, { css } from 'styled-components';

interface WeatherType{
    status:string;
    dataName:string;
}
//날씨 상태에 따른 Box 배경색/선 색상 정의
const badBgcDark = 'rgba(255, 71, 71, 0.05)';
const badColor = "#ad1c15"
const badColorDark = "#eb231a"
const normalBgcDark = 'rgba(84, 225, 71, 0.05)';
const normalColor = '#5a9c5a';
const normalColorDark = '#4ecc4e';
const goodBgcDark = 'rgba(0, 150, 250, 0.05)';
const goodColor = '#2552ba';
const goodColorDark = '#0095e6';

const Boxes:any= styled.div`
    width: calc(25% - 6px);
    ${(props:WeatherType) => 
        (props.status.includes('나쁨')) ? css`
            background-color:${badBgcDark};
            border-color:${badColor};
            color:${badColorDark};
            `
        : (props.status === '보통') ? css`
            background-color:${normalBgcDark};
            border-color:${normalColor};
            color:${normalColorDark};
            `
        : (props.status === '좋음') ? css`
            background-color:${goodBgcDark};
            border-color:${goodColor};
            color:${goodColorDark};
            `
        : css`background-color:transparent;`
    }
`

const WeatherBox = ({status,dataName}:WeatherType) => {
    return (
        <Boxes status={status} 
        className='p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-center'
        >
            <p className="text-sm">{dataName}</p>
            <p className="mt-1 text-base font-semibold">
                {status}&nbsp;
                {dataName==='기압' && 'hPa'}
                {dataName==='바람' && 'm/s'}
                {dataName==='습도' && '%'}
            </p>
        </Boxes>
    )
}

export default WeatherBox;