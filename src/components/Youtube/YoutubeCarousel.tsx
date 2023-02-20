import RegistDragEvent from "./Carousel";
import { useState } from "react";
import useCarouselSize from "./CarouselSize";

const imageList = [
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2732BB3F583C95DD2C",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2228F43F583C95E22F",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2726EF3F583C95EA2B",
];

// width 1일 떄 height의 비율

const YoutubeCarousel = () => {
  const [hide, setHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const [animate, setAnimate] = useState(false);

  const slideList = [imageList.at(-1), ...imageList, imageList.at(0)];

  const { ref: carouselRef, width, height } = useCarouselSize();

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };
  return (
    <>
      <div
        ref={carouselRef}
        className="w-full mt-5 p-3 pt-2 relative border bg-white border-slate-300 rounded-lg overflow-hidden"
        style={{
          height,
          overflow: "hidden",
        }}
      >
        <span className="grid justify-items-start">
          YouTube 추천
        </span>
        <div
          className="flex mt-3"
          style={{
            transform: `translateX(${
              -currentIndex * (width as any) + transX
            }px)`,
            transition: `transform ${animate ? 300 : 0}ms ease-in-out 0s`,
          }}
          {...RegistDragEvent({
            onDragChange: (e) => {
              setTransX(inrange(e, -width + 10, (width as any) - 10));
            },
            onDragEnd: (e) => {
              const maxIndex = slideList.length - 1;

              if (e < -100)
                setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
              if (e > 100)
                setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));

              setAnimate(true);
              setTransX(0);
            },
          })}
          onTransitionEnd={() => {
            setAnimate(false);

            if (currentIndex === 0) {
              setCurrentIndex(slideList.length - 2);
            } else if (currentIndex === slideList.length - 1) {
              setCurrentIndex(1);
            }
          }}
        >
          {slideList.map((item, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="flex-col">
                <img
                  draggable={false}
                  src={item}
                  alt="img"
                  width={width}
                  className="cursor-pointer mx-1"
                />
                <h1 className="mt-2 grid ml-2 justify-items-start">
                  title
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default YoutubeCarousel;
