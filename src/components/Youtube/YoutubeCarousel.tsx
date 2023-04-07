import RegistDragEvent from "./Carousel";
import { useState } from "react";
import useCarouselSize from "./CarouselSize";
import { useRecoilValueLoadable } from "recoil";
import { getYoutube, YoutubeProps } from "../../atom/Youtube";
import WidgetLoading from "../Modal/WidgetLoading";

const YoutubeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const [animate, setAnimate] = useState(false);
  const Youtube = useRecoilValueLoadable(getYoutube);

  let LoadablegetYoutube: YoutubeProps[] = [];
  switch (Youtube.state) {
    case "hasValue":
      LoadablegetYoutube = Youtube.contents;
      break;
  }
  let imageList = LoadablegetYoutube.map((item: YoutubeProps) => item);
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
        className="w-full px-3 py-4 pt-2 relative border bg-white dark:bg-neutral border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden"
        style={{
          height,
          overflow: "hidden",
        }}
      >
        <div className="w-full flex">
          <span className="grid justify-items-start mb-1">YouTube 추천</span>
        </div>
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
          {Youtube.state === "loading" ? (
            <WidgetLoading />
          ) : (
            slideList.map((item: any, i) => (
              <div key={i} className="flex-shrink-0">
                <div className="flex-col relative">
                  <img
                    draggable={false}
                    src={item.imagePath}
                    alt="img"
                    width={width}
                    className="mx-1 rounded-lg"
                  />
                  <span className="absolute top-28 right-3 text-sm text-white font-bold rounded-lg bg-black bg-opacity-50 px-1">
                    {item.length}
                  </span>
                  <a href={item.videoUrl} target="_blank">
                    <div className="w-56 ml-3 text-left">
                      <p className="text-base pt-1 truncate">
                        {item.contentName}
                      </p>
                      <p className="text-sm font-light mb-1 text-slate-700 dark:text-slate-400">
                        {item.channelName}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default YoutubeCarousel;
