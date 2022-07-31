import { useState, useEffect, useRef } from "react";

const useKeyPressed = () => {
  const [keysPressed, setKeysPressed] = useState({});
  const ref = useRef(keysPressed);

  const handleKeyDown = (e) => {
    setKeysPressed((prev) => {
      if (prev.hasOwnProperty(e.key)) return prev;

      return { ...prev, [e.key]: true };
    });
  };

  const handleKeyUp = (e) => {
    setKeysPressed((prev) => {
      const stateCopy = { ...prev };
      delete stateCopy[e.key];
      return stateCopy;
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    ref.current = keysPressed;
  }, [keysPressed]);

  return [keysPressed, ref];
};

export default useKeyPressed;
