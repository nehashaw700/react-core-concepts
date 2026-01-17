import { useEffect } from "react";
import useThrottleFn from "../utils/useThrottleFn";

const ScrollTacker = () => {
    const throttledScroll= useThrottleFn(() => {
        console.log("scroll Y: " ,window.scrollY);
    }, 500);

    useEffect(() => {
        window.addEventListener('scroll', throttledScroll);
        return () => window.removeEventListener('scroll',throttledScroll)
    }, [])

    return (
        <div className="scroller">
            Please scroll me
            <p id="scrollerHeight"></p>
        </div>
    )
}

export default ScrollTacker;