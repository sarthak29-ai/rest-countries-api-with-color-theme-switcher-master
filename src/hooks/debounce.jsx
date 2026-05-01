import { useCallback, useRef, useEffect } from 'react';

export const UseDebounce = (callback, delay) => {
  const timer = useRef();

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = useCallback((...args) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedFunction;
};
