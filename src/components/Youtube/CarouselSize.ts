import { useEffect, useRef, useState } from "react";

export interface useCarouselSizeType {
  Width?: number;
  Height?: number;
}

export default function useCarouselSize(
  { Width = 0, Height = 0 }: useCarouselSizeType = {
    Width: 0,
    Height: 0,
  }
) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [{ width, height }, setCarouselSize] = useState({
    width: Width,
    height: Height,
  });

  useEffect(() => {
    if (!carouselRef.current) return;

    setCarouselSize({
      width: 248,
      height: 250,
    });
  }, [carouselRef]);

  return {
    ref: carouselRef,
    width,
    height,
  };
}
