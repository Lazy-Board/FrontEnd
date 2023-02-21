import styled from 'styled-components';
import { forwardRef } from 'react';

const ExchangeContent = styled.div`
    transition:all 0.3s;
`

const AccordionContent = (props:any, ref:any):JSX.Element => {
<<<<<<< HEAD
    const { height, buy, sell, send, receive } = props;
=======
    const { height, buyCash, sellCash, sendMoney, receiveMoney } = props;
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
    
    return (
        <ExchangeContent className="w-full px-2 mt-2 overflow-hidden" 
        ref={ref} 
        style={{ height: height }}
        >
            <p className="flex py-1 justify-between text-sm">
                <span>현찰 사실 때</span>
<<<<<<< HEAD
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
=======
                <span>{buyCash}</span>
            </p>
            <p className="flex py-1 justify-between text-sm">
                <span>현찰 파실 때</span>
                <span>{sellCash}</span>
            </p>
            <p className="flex py-1 justify-between text-sm">
                <span>송금 보내실 때</span>
                <span>{sendMoney}</span>
            </p>
            <p className="flex py-1 justify-between text-sm">
                <span>송금 받으실 때</span>
                <span>{receiveMoney}</span>
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
            </p>
        </ExchangeContent>
    )
}

export default forwardRef(AccordionContent);