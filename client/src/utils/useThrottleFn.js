import { useCallback, useRef } from "react";

const useThrottleFn = (fn, delay) => {
  const lastTime = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();

      if (now - lastTime.current >= delay) {
        lastTime.current = now;
        fn(...args);
      }
    },
    [fn, delay],
  );

  // Throttle ensures a function runs at most once in a given interval, no matter how many times it's triggered.
};

export default useThrottleFn;

// JS Version
// function throttle(fn,delay){
//     let lastTime= 0;
//     return (...args) =>{
//         const now = Date.now();
//         if(now - lastTime >= delay){
//             fn.apply(this.args);
//             lastTime= now;
//         }
//     }
// }

// function fm() {
//     console.log(" Throttled Function called");
// }
// const throttledFn = throttle(fm, 1000);
// throttledFn();
// throttledFn();
// throttledFn();
// throttledFn();
