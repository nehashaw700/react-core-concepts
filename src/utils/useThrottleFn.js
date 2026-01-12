const useThrottleFn = (fn, delay) => {
    const lastTime = useRef(0);

    return (...args) =>{
        const now = Date.now();

        if(now - lastTime.current >= delay){
            lastTime.current = now;
            fn(...args);
        }
    }
}

export default useThrottleFn;