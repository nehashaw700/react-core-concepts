import { useState, useEffect } from "react";
import useDebounce from "../utils/useDebounce";

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if(!debouncedSearchValue) return;

        console.log(debouncedSearchValue);

    }, [debouncedSearchValue]);

    return (
        <input className="search-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Please search here">
        </input>
    )

    /***
     * when user stops typing, invoke search after a certain delay
     * Create input search element
     * on every change, set Search Value
     * we will utilize useDebounce() hook to get debouncedSearchValue for which we will have to do actual search
     */
}

export default Search;