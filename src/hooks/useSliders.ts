import { useRef, useState, useEffect } from "react";
//2페이지 인디케이터+swipe 기능 슬라이드

export const useSliders = () => {
    const TOTAL_SLIDES = 1;
    let startPoint = 0;
    let endPoint = 0;

    const [currentSlide, setCurrentSlide] = useState(0);
<<<<<<< HEAD
    const slideRef = useRef<any>(null);
    const dotRef = useRef<any>([]);

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.4s ease-in-out';
        slideRef.current.style.left = `-${currentSlide}00%`;
        if (slideRef.current){
            slideRef.current.addEventListener("mousedown", (e:any) => {
                startPoint = e.pageX;
            });
            slideRef.current.addEventListener("mouseup", (e:any) => {
                endPoint = e.pageX;
                if (startPoint < endPoint) {
                    NextSlide();
                } else if (startPoint > endPoint) {
                    PrevSlide();
=======
    const slideRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<any[]>([]);

    useEffect(() => {
        slideRef.current!.style.transition = 'all 0.4s ease-in-out';
        slideRef.current!.style.left = `-${currentSlide}00%`;

        if (slideRef.current){
            slideRef.current.addEventListener("mousedown", (e:MouseEvent) => {
                startPoint = e.pageX;
            });
            slideRef.current.addEventListener("mouseup", (e:MouseEvent) => {
                endPoint = e.pageX;
                // 아이템 개수가 적을 때 슬라이드 되는 상황 방지
                // slide width 사이즈가 400 이상일 때만(아이템 2개 이상) 가능하도록
                if (slideRef.current!.offsetWidth > 400){
                    if (startPoint < endPoint) {
                        NextSlide();
                    } else if (startPoint > endPoint) {
                        PrevSlide();
                    }
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b
                }
            });
        }
        if (currentSlide !== 1) {
            dotRef.current[currentSlide].style.backgroundColor = "#66CC8A";
            dotRef.current[currentSlide+1].style.backgroundColor = "#6b728085";
        } 
        if (currentSlide === 1) {
            dotRef.current[currentSlide].style.backgroundColor = "#66CC8A";
            dotRef.current[currentSlide-1].style.backgroundColor = "#6b728085";
        }
<<<<<<< HEAD
    }, [currentSlide]);
=======
    }, [currentSlide,slideRef.current?.offsetWidth]);
>>>>>>> 27771d6d6ff1ae9f91955b58f941bcb36653473b

    const NextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0); 
        } else {
            setCurrentSlide(currentSlide);
        }
    };

    const PrevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return { slideRef, dotRef, NextSlide, PrevSlide }
}