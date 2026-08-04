import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Debouncimg ensures a function runs after a given delay, when the user has stopped typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

// JS Version
// function debounce(fn, delay){
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.apply(this, args);
//         }, delay)
//     }
// }

// function fn() {
//     console.log("Function called");
// }

// const debouncedFn = debounce(fn, 1000);
// debouncedFn();
// debouncedFn();
// debouncedFn();
// debouncedFn();
