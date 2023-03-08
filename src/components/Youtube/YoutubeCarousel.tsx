import RegistDragEvent from "./Carousel";
import { useState } from "react";
import useCarouselSize from "./CarouselSize";
import { selector, useRecoilValue, useRecoilValueLoadable } from "recoil";
import axios from "axios";
import { getYoutube, YoutubeProps } from "../../atom/Youtube";
import LoadingBar from "../Stock/Loading";
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
        className="w-full mt-5 px-3 py-4 pt-2 relative border bg-white border-slate-300 rounded-lg overflow-hidden"
        style={{
          height,
          overflow: "hidden",
        }}
      >
        <div className="w-full flex border border-white border-b-slate-300 ">
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
            <LoadingBar />
          ) : (
            slideList.map((item: any, i) => (
              <div key={i} className="flex-shrink-0">
                <div className="flex-col">
                  <img
                    draggable={false}
                    src={item.imagePath}
                    alt="img"
                    width={width}
                    className="mx-1 rounded-lg"
                  />
                  <span className="absolute top-28 ml-20 text-sm text-white font-bold rounded-lg bg-black bg-opacity-50 px-1">
                    {item.length}
                  </span>
                  <a href={item.videoUrl} target="_blank">
                    <div className="w-56 ml-3 text-left">
                      <p className=" text-sm font-sans py-1 truncate">
                        {item.contentName}
                      </p>
                      <p className="font-sans text-xs font-semibold mb-1">
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
