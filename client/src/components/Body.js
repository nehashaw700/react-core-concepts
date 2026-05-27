import InfiniteScroller from "./InfiniteScroller";
import ScrollTacker from "./ScrollTracker";
import Search from "./Search";
import Counter from "./Counter";

const Body = () => {
    return (
        <div className="body">
            <Search />
            <Counter />
            <InfiniteScroller />
        </div>
    )
}

export default Body