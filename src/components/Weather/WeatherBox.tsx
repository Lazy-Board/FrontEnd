import styled, { css } from 'styled-components';

interface WeatherType{
    status:string;
    dataName:string;
    speed?:string;
}

//날씨 상태에 따른 Box 배경색/선 색상 정의
const badBgc = '#ffe0de';
const badColor = "#ad1c15"
const normalBgc = '#ebfae8';
const normalColor = '#5a9c5a';
const goodBgc = '#ebf7ff';
const goodColor = '#2552ba';

const Boxes:any = styled.div`
    width: calc(25% - 6px);
    ${(props:WeatherType) => 
        (props.status.includes('나쁨')) ? css`
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

const WeatherBox = ({status,dataName,speed}:WeatherType) => {
    return (
        <Boxes status={status} 
        className="p-2 border border-slate-300 rounded-lg text-center" 
        >
            <p className="text-xs">{dataName}</p>
            <p className="mt-1 text-sm font-semibold">{status ? status : speed}</p>
        </Boxes>
    )
}

export default WeatherBox;