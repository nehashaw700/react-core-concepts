import { useEffect, useState, useRef } from "react";


const Counter = () => {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false); // state var as its affecting UI update by disabling button
    const intervalRef = useRef(null); //using useRef as intervalRef does not need to re-render the component

    const startCounter = () => {
         if(intervalRef.current){ return; }
            
            setRunning(true);
            intervalRef.current = setInterval(() => {
                setCount((c) => c + 1);
            }, 200);
    }

    const pauseCounter = () => {
        if(intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setRunning(false);
        }
    }

    const resetCounter = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setRunning(false);
        setCount((c) => 0);
    }

    useEffect(() => {
        // clearing SetInterval on Unmount
        return () => { clearInterval(intervalRef); }
    }, []);

    return (
        <div className = "counter">
            <div><b>{count}</b></div>
            <div className="counter-buttons">
            <button onClick={startCounter} disabled={running}>Start</button>
            <button onClick={pauseCounter} disabled={!running}>Pause</button>
            <button onClick={resetCounter}>Reset</button>
        </div>
        </div>
    )
}

export default Counter;