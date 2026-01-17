import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import useThrottleFn from "../utils/useThrottleFn";
import fetchItems from "../utils/fetchItemsAsPerPage";

const InfiniteScroller = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadingRef = useRef(false);
    const {ref: bottomRef, inView} = useInView();

    const loadItems = async () => {
        if(loadingRef.current || items.length >= 200) { return; } 

        loadingRef.current = true;
        setLoading(true);

        const newItems = await fetchItems(page);
        console.log(newItems);

        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
        loadingRef.current = false;
    }
    
    // load items initially
    // useEffect(() => {
    //     if(items.length === 0) {
    //         loadItems(); 
    //     }
    // }, []);


    // using throttling hook to attempt to loadItems at an interval of 500ms
    const throttledScrollHandler = useThrottleFn(loadItems, 500);

    useEffect(() => {
        console.log("inView", inView)

       if(inView){
        console.log("inView inside", inView)
        throttledScrollHandler();
       }
    }, [inView]);

    return (
        <div>,
            {
                items.map((item, index) => {
                    return (
                        <div
                            key={"item" + index}
                            style={{
                                border: "2px solid black",
                                margin: "15px 20vh",
                                width: "60%"
                            }}> {item}
                        </div>
                    )
                })
            }

            <div ref={bottomRef} style={{ height: 1 }}>  </div>
            { loading && <h1>Loading!!!</h1> }
        </div>
    )
}

export default InfiniteScroller;