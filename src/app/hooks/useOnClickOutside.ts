import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handleClick: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handleClick]);
};

export default useOnClickOutside;
