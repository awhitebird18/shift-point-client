import { useEffect, useRef } from "react";

export const useTopOfPage = (componentHandler) => {
  const timesheetHeaderRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (timesheetHeaderRef.current.getBoundingClientRect()?.top === 0) {
        componentHandler(true);
      } else {
        componentHandler(false);
      }
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  });

  return timesheetHeaderRef;
};
