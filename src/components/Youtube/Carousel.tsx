const click =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

const RegistDragEvent = ({
  onDragChange,
  onDragEnd,
  stopPropagation,
}: {
  onDragChange?: (Width: number, Height: number) => void;
  onDragEnd?: (Width: number, Height: number) => void;
  stopPropagation?: boolean;
}) => {
  if (click) {
    return {
      onTouchStart: (touchEvent: React.TouchEvent<HTMLDivElement>) => {
        if (stopPropagation) touchEvent.stopPropagation();

        const touchMoveHandler = (moveEvent: TouchEvent) => {
          if (moveEvent.cancelable) moveEvent.preventDefault();

          const Width =
            moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
          const Height =
            moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;
          onDragChange?.(Width, Height);
        };

        const touchEndHandler = (moveEvent: TouchEvent) => {
          const Width =
            moveEvent.changedTouches[0].pageX -
            touchEvent.changedTouches[0].pageX;
          const Height =
            moveEvent.changedTouches[0].pageY -
            touchEvent.changedTouches[0].pageY;
          onDragEnd?.(Width, Height);
          document.removeEventListener("touchmove", touchMoveHandler);
        };

        document.addEventListener("touchmove", touchMoveHandler, {
          passive: false,
        });
        document.addEventListener("touchend", touchEndHandler, { once: true });
      },
    };
  }

  return {
    onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      if (stopPropagation) clickEvent.stopPropagation();

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const Width = moveEvent.pageX - clickEvent.pageX;
        const Height = moveEvent.pageY - clickEvent.pageY;
        onDragChange?.(Width, Height);
      };

      const mouseUpHandler = (moveEvent: MouseEvent) => {
        const Width = moveEvent.pageX - clickEvent.pageX;
        const Height = moveEvent.pageY - clickEvent.pageY;
        onDragEnd?.(Width, Height);
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler, { once: true });
    },
  };
}

export default RegistDragEvent;
