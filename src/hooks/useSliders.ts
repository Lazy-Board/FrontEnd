import { useRef, useState, useEffect } from "react";
//2페이지 인디케이터+swipe 기능 슬라이드

export const useSliders = () => {
  const TOTAL_SLIDES = 1;
  let startPoint = 0;
  let endPoint = 0;

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<any[]>([]);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current!.style.transition = "all 0.4s ease-in-out";
      slideRef.current!.style.left = `-${currentSlide}00%`;

      // 마우스 커서, 터치 모두 작동하도록 
      slideRef.current.addEventListener("mousedown", handleMouseDown);
      slideRef.current.addEventListener("mouseup", handleMouseUp);
      slideRef.current.addEventListener("touchstart", handleTouchStart);
      slideRef.current.addEventListener("touchend", handleTouchEnd);
    }
    if (dotRef.current && currentSlide !== 1) {
      dotRef.current[currentSlide].style.backgroundColor = "#66CC8A";
      dotRef.current[currentSlide + 1].style.backgroundColor = "#6b728085";
    }
    if (dotRef.current && currentSlide === 1) {
      dotRef.current[currentSlide].style.backgroundColor = "#66CC8A";
      dotRef.current[currentSlide - 1].style.backgroundColor = "#6b728085";
  }

    return () => {
      if (slideRef.current) {
        slideRef.current.removeEventListener("mousedown", handleMouseDown);
        slideRef.current.removeEventListener("mouseup", handleMouseUp);
        slideRef.current.removeEventListener("touchstart", handleTouchStart);
        slideRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentSlide, slideRef.current?.offsetWidth]);

  const handleMouseDown = (e: MouseEvent) => {
    startPoint = e.pageX;
  };

  const handleMouseUp = (e: MouseEvent) => {
    endPoint = e.pageX;
    handleSlideChange();
  };

  const handleTouchStart = (e: TouchEvent) => {
      startPoint = e.touches[0].pageX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
      endPoint = e.changedTouches[0].pageX;
      handleSlideChange();
  };

  const handleSlideChange = () => {
    // 아이템 개수가 적을 때 슬라이드 되는 상황 방지
    // slide width 사이즈가 400 이상일 때만(아이템 2개 이상) 가능하도록
    if (slideRef.current!.offsetWidth > 400) {
      if (startPoint < endPoint) {
        NextSlide();
      } else if (startPoint > endPoint) {
        PrevSlide();
      }
    }
  };

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

  return { slideRef, dotRef, NextSlide, PrevSlide };
};
