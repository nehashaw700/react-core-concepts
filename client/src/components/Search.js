import { useState, useEffect } from "react";
import useDebounce from "../utils/useDebounce";

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedSearchValue) return;

        console.log(debouncedSearchValue);

    }, [debouncedSearchValue]);

    return (
        <div className="search">      
        <input className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Please search here">
        </input>
        </div>
    )

        /***
         * Debouncing --> ensuring a function runs after a certain delay, only after user stops typing.
         * Create input search element
         * on every change, set Search Value
         * we will utilize useDebounce() hook to get debouncedSearchValue for which we will have to do actual search
         */

        /* In Javascript --> 
        < input type = text id = "searchBox" > </input >
            <script>
                var searchValue = "";
                var debouncedValue = searchValue;
                var timer;

                function debounce(value, delay){
                    clearTimeout(timer);
        
                    return setTimeout(() => {
                        debouncedValue = value;
                    document.getElementById('para').innerHTML = debouncedValue;
                    }, delay); 
                }

                document.getElementById('searchBox').addEventListener('input', (e) =>{
                    searchValue = e.target.value;
                    timer = debounce(searchValue, 500);
        });
            </script>
        */
}

export default Search;