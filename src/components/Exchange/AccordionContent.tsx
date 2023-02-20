import styled from 'styled-components';
import { forwardRef } from 'react';

const ExchangeContent = styled.div`
    transition:all 0.3s;
`

const AccordionContent = (props:any, ref:any):JSX.Element => {
    const { height, buy, sell, send, receive } = props;
    
    return (
        <ExchangeContent className="w-full px-2 mt-2 overflow-hidden" 
        ref={ref} 
        style={{ height: height }}
        >
            <p className="flex py-1 justify-between text-sm">
                <span>현찰 사실 때</span>
                <span>{buy}</span>
            </p>
            <p className="flex py-1 justify-between text-sm">
                <span>현찰 파실 때</span>
                <span>{sell}</span>
            </p>
            <p className="flex py-1 justify-between text-sm">
                <span>송금 보내실 때</span>
                <span>{send}</span>
            </p>
            <p className="flex py-1 justify-between text-sm">
                <span>송금 받으실 때</span>
                <span>{receive}</span>
            </p>
            <p className="flex py-1 justify-between text-sm">
                <span>미화환산율</span>
                <span>1234.56</span>
            </p>
        </ExchangeContent>
    )
}

export default forwardRef(AccordionContent);