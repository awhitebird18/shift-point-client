import { useRef, useEffect } from "react";

const useClickOutside = (componentHandler) => {
  let domNode = useRef();

  useEffect(() => {
    let eventHandler = (e) => {
      if (domNode.current && !domNode.current?.contains(e.target)) {
        componentHandler(false);
      }
      // else {
      //   console.log("true");
      //   componentHandler(true);
      // }
    };

    document.addEventListener("click", eventHandler);

    return () => {
      document.removeEventListener("click", eventHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
