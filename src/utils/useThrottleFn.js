import { useCallback, useRef} from "react";

const useThrottleFn = (fn, delay) => {
    const lastTime = useRef(0);

    return useCallback((...args) =>{
        const now = Date.now();

        if(now - lastTime.current >= delay){
            lastTime.current = now;
            fn(...args);
        }
    }, [fn, delay]);

   // Throttle ensures a function runs at most once in a given interval, no matter how many times it's triggered.
}

export default useThrottleFn;