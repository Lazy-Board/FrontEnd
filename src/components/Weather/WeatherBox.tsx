import styled, { css } from 'styled-components';

interface WeatherType{
    status:string;
    dataName:string;
}

const Boxes:any= styled.div`
    width: calc(33% - 6px);
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